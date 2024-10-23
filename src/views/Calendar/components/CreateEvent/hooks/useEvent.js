import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import useAxios from 'hooks/useAxios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import useModal from 'hooks/useModal';
import _ from 'lodash-es';
import { messagess } from './messages';

const DEFAULT_START_TIME = 0;
const DEFAULT_END_TIME = 2400;
const USER_TYPES = { DOCTOR: 'doctor', DEFAULT: 'default' };

export const useEvent = () => {
  const intl = useIntl();
  const [custom, setCustom] = useState(false);
  const [screen, updateScreen] = useState({ name: '' });
  const [rangeTimeType, updateRangeTimeType] = useState(null);
  const [priority, updatePriority] = useState('');
  const [campaign, updateCampaign] = useState(null);
  const [loading, updateLoading] = useState(false);
  const [loadingCampaigns, updateLoadingCampaigns] = useState(false);
  const [campaigns, updateCampaigns] = useState([]);
  const [screens, updateScreens] = useState([]);
  const [screenCampaigns, updateScreenCampaigns] = useState([]);
  const [canUpdate, updateCanUpdate] = useState(true);
  const [canCheckAvailability, updateCanCheckAvailability] = useState(false);
  const [availability, updateAvailability] = useState(false);
  const [startDate, updateStartDate] = useState('');
  const [endDate, updateEndDate] = useState('');
  const [startTime, updateStartTime] = useState('');
  const [endTime, updateEndTime] = useState('');
  const [id, idUpdate] = useState(useParams().id);
  const [alertVisible, updateAlertVisible] = useState(false);
  const [userType, setUserType] = useState(USER_TYPES.DEFAULT);
  const [apiValues, setApiValues] = useState({});
  const [userModifiedValues, setUserModifiedValues] = useState(false);
  const modal = useModal();

  useEffect(() => {
    if (id) {
      GetEvent(id);
    }
  }, [id]);

  useEffect(() => {
    SearchScreens();
    SearchCampaigns();
  }, []);

  useEffect(() => {
    updateAvailability(false);
    updateCanUpdate(false);
  }, [userType]);

  useEffect(() => {
    if (!custom) {
      updateAvailability(true);
    }
  }, [custom]);

  useEffect(() => {
    let userModifiedValues =
      startDate !== apiValues.startDate ||
      endDate !== apiValues.endDate ||
      userType !== apiValues.userType ||
      startTime !== apiValues.startTime ||
      endTime !== apiValues.endTime;

    setUserModifiedValues(userModifiedValues);
    if (!userModifiedValues) {
      updateAvailability(true);
    }
  }, [startDate, endDate, userType, apiValues, startTime, endTime]);

  useEffect(() => {
    let validTime = (startTime && endTime) || (!startTime && !endTime);

    let canCheckAvailability =
      screen &&
      Number.isInteger(screen.id) &&
      startDate &&
      endDate &&
      validTime &&
      userModifiedValues;

    updateCanCheckAvailability(canCheckAvailability);
    updateCanUpdate(
      screen &&
        Number.isInteger(screen.id) &&
        screenCampaigns.length > 0 &&
        startDate &&
        endDate &&
        validTime &&
        availability
    );
  }, [
    screen,
    screenCampaigns,
    startDate,
    endDate,
    availability,
    startTime,
    endTime,
    apiValues
  ]);

  const SearchCampaigns = (value) => {
    const axios = useAxios();

    updateLoadingCampaigns(true);
    axios
      .get(`/campaign?page_number=1&page_size=10`)
      .then((response) => {
        if (response.status === 200) {
          updateCampaigns(response.data.result.items);
        }
      })
      .finally(() => {
        updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SearchScreens = (value) => {
    const axios = useAxios();

    axios
      .get(`/screen?page_number=1&page_size=10`)
      .then((response) => {
        if (response.status === 200) {
          updateScreens(response.data.result.items);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddEvent = () => {
    const axios = useAxios();
    let event = {
      screen_id: screen.id,
      priority: priority === true,
      user_type: userType,
      custom,
      campaign_ids: screenCampaigns.map((sc) => sc.id)
    };

    if (custom) {
      event.start_date = moment(startDate).toISOString();
      event.end_date = moment(endDate).toISOString();
    } else {
      event.start_time = DEFAULT_START_TIME;
      event.end_time = DEFAULT_END_TIME;
    }

    axios
      .post(`/events`, event)
      .then((response) => {
        if (response.status === 201) {
          //history.push("/calendar");
          updateAlertVisible(true);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateEvent = () => {
    const axios = useAxios();
    let event = {
      screen_id: screen.id,
      start_date: moment(startDate).format(),
      end_date: moment(endDate).format(),
      priority: priority === 'Si',
      campaign_ids: screenCampaigns.map((sc) => sc.id),
      user_type: userType
    };

    if (startTime && endTime) {
      event.start_time = parseInt(startTime.replace(':', ''));
      event.end_time = parseInt(endTime.replace(':', ''));
    } else {
      event.start_time = DEFAULT_START_TIME;
      event.end_time = DEFAULT_END_TIME;
    }

    axios
      .put(`/events/${id}`, event)
      .then((response) => {
        if (response.status === 200) {
          updateAlertVisible(true);
          //history.push("/calendar");
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetEventScreen = (screenId) => {
    const axios = useAxios();

    axios
      .get(`/events/screen/${screenId}`)
      .then((response) => {
        if (response.status === 200) {
          const screen = response.data.result.items[0];
          const selectedScreen = { id: screen.id, name: screen.name };

          updateScreens([...screenCampaigns, selectedScreen]);
          updateScreen(selectedScreen);

          const event = screen.events.find((e) => e.id.toString() === id);

          if (event) {
            let startDate = moment(event.start_date).format('YYYY-MM-DD');
            let endDate = moment(event.end_date).format('YYYY-MM-DD');

            updateStartDate(startDate);
            //updateStartTime(event.start_time)
            updateEndDate(endDate);
            //updateEndTime(event.end_time)
            updatePriority(event.priority === 0 ? false : true);
            updateScreenCampaigns(event.campaign.filter((c) => c !== null));
            let startTime = `${event.start_time
              .toString()
              .substr(0, 2)}:${event.start_time.toString().substr(2, 2)}`;
            let endTime = `${event.end_time
              .toString()
              .substr(0, 2)}:${event.end_time.toString().substr(2, 2)}`;

            updateStartTime(startTime);
            updateEndTime(endTime);
            let userType = event.user_type || USER_TYPES.DEFAULT;

            setUserType(userType);
            setApiValues({ startDate, endDate, userType, endTime, startTime });
          }
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addScreenCampaigns = () => {
    if (campaign) {
      const toAddCampaign = screenCampaigns.find((c) => c.id === campaign.id);

      if (!toAddCampaign) {
        updateScreenCampaigns([campaign, ...screenCampaigns]);
      }
    }
  };

  const removeScreenCampaigns = (campaign) => {
    let newArray = [...screenCampaigns];

    newArray.splice(
      screenCampaigns.findIndex((c) => c.id === campaign.id),
      1
    );
    updateScreenCampaigns(newArray);
  };

  const changeScreenCampaigns = ({ newItems }) => {
    updateScreenCampaigns(newItems);
  };

  const toggleUserType = () =>
    setUserType(userType == 'doctor' ? 'default' : 'doctor');

  const CheckAvailability = () => {
    const axios = useAxios();
    let route = `/events/screen/${screen.id}/availability?start_date=${moment(
      startDate
    ).format()}&end_date=${moment(endDate).format()}`;

    if (startTime && endTime) {
      route += `&start_time=${startTime.replace(':', '')}`;
      route += `&end_time=${endTime.replace(':', '')}`;
    } else {
      route += `&start_time=${DEFAULT_START_TIME}&end_time=${DEFAULT_END_TIME}`;
    }

    if (userType === USER_TYPES.DOCTOR) {
      route += `&user_type=${userType}`;
    }

    axios
      .get(route)
      .then((response) => {
        if (response.status === 200) {
          let availability = _.get(response, 'data.result.availability', false);
          let msgs = {
            title: intl.formatMessage(messagess.availableTitle),
            text: intl.formatMessage(messagess.availableText)
          };

          if (!availability) {
            msgs.title = intl.formatMessage(messagess.notAvailableTitle);
            msgs.text = intl.formatMessage(messagess.notAvailableText);
          }

          modal.openModal(msgs.title, msgs.text);
          updateAvailability(availability);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetEvent = (id) => {
    const axios = useAxios();

    axios
      .get(`/events/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const event = response.data.result.items[0];

          GetEventScreen(event.screen_id);
        }
      })
      .finally(() => {
        // updateLoadingCampaigns(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetValues = () => {
    updateScreens([]);
    updateScreen({ name: '' });
    updateStartDate('');
    updateEndDate('');
    updateStartTime('');
    updateEndTime('');
    updateCampaigns([]);
    updatePriority('');
    updateCampaign(null);
    updateScreenCampaigns([]);
  };

  return {
    event: {
      screen,
      rangeTimeType,
      priority,
      campaign,
      startDate,
      endDate,
      startTime,
      endTime,
      userType
    },
    methods: {
      updateScreen,
      updateRangeTimeType,
      updatePriority,
      updateCampaign,
      SearchCampaigns,
      SearchScreens,
      AddEvent,
      addScreenCampaigns,
      removeScreenCampaigns,
      changeScreenCampaigns,
      updateStartDate,
      updateEndDate,
      CheckAvailability,
      updateStartTime,
      updateEndTime,
      UpdateEvent,
      updateAlertVisible,
      toggleUserType,
      toggleModal: modal.toggleModal,
      resetValues,
      setCustom
    },
    list: {
      campaigns,
      screens,
      screenCampaigns
      // selectedCampaigns
    },
    data: {
      loading,
      canUpdate,
      loadingCampaigns,
      canCheckAvailability,
      alertVisible,
      modalTitle: modal.title,
      modalText: modal.text,
      showModal: modal.showModal,
      availability,
      custom
    }
  };
};
