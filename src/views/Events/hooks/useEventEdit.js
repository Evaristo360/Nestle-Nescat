import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';
import moment from 'moment';
import { formatedMessages } from 'providers/formMessages';
import useAxios from 'hooks/useAxios';
import {
  addEvent,
  editEvent,
  getEvent,
  checkAvailabilityEvent
} from 'providers/api/requests/events';
import usePromiseModal from 'hooks/usePromiseModal';
import { messages } from '../EventMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';

const validationSchema = Yup.object().shape({
  screen_id: Yup.number().required(formatedMessages.required),
  custom: Yup.boolean(),
  start_date: Yup.string().when('custom', {
    is: true,
    then: Yup.string().required(formatedMessages.required)
  }),
  end_date: Yup.string().when('custom', {
    is: true,
    then: Yup.string().required(formatedMessages.required)
  }),
  start_time: Yup.string().when('custom', {
    is: true,
    then: Yup.string().required(formatedMessages.required)
  }),
  end_time: Yup.string().when('custom', {
    is: true,
    then: Yup.string().required(formatedMessages.required)
  }),
  priority: Yup.boolean(),
  campaign_ids: Yup.array()
    .min(1, 'Se necesita por lo menos una campaña')
    .required(formatedMessages.required)
});

const getTime = (time) => {
  const [hours, minutes] = time.split(':');

  return Number(hours + minutes) || 0;
};

const parseApiTime = (apiTime) => {
  if (apiTime === 0) return '00:00';
  const strTime = `${apiTime}`;

  if (strTime.length === 2) return `${strTime}:00`;
  if (strTime.length === 4)
    return `${strTime.substring(0, 2)}:${strTime.substring(2, 4)}`;

  return '00:00';
};

export const useEventEdit = ({ id, onClose, newEvent }) => {
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const { get, deleteRequest } = useAxios();
  const [screens, setScreens] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const modal = usePromiseModal();
  const msgs = useIntlMessages(messages);
  //bandera para saber si hubo un error
  const [errorCreate, setErrorCreate] = useState(false);

  const formik = useFormik({
    initialValues: {
      screen_id: '',
      custom: false,
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      priority: false,
      campaign_ids: []
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          screen_id: values.screen_id,
          custom: values.custom,
          start_date: moment(values.start_date).toISOString(),
          end_date: moment(values.end_date).toISOString(),
          start_time: getTime(values.start_time),
          end_time: getTime(values.end_time),
          priority: values.priority,
          campaign_ids: values.campaign_ids
        };
        let response;

        if (values.custom && !isEdit) {
          const availability = await checkAvailability(values);

          if (!availability) {
            await showAvailabilityStatus(availability);

            return;
          }
        } else if (!values.custom) {
          data.start_date = null;
          data.end_date = null;
          data.start_time = 0;
          data.end_time = 0;
        }

        if (isEdit) {
          response = await editEvent(id, data);
        } else {
          response = await addEvent(data);
          if(response.error){
            setErrorCreate(true);
          }else{
            setErrorCreate(false);
          }
        }
        onClose();
      } catch (error) {
        setErrorCreate(true);
        console.log({ error });
      }
    }
  });

  useEffect(() => {
    loadItems('/screen').then((items) => setScreens(items));
    loadItems('/campaign').then((items) => setCampaigns(items));
  }, []);

  useEffect(() => {
    if (newEvent && errorCreate === false){
      formik.setValues({
        screen_id: '',
        custom: false,
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        priority: false,
        campaign_ids: []
      });
    }
  }, [newEvent]);

  useEffect(() => {
    setSelectedCampaigns(getSelectedCampaigns(formik.values.campaign_ids));
  }, [formik.values.campaign_ids]);

  useEffect(() => {
    loadEvent(id);
  }, [id]);

  const loadEvent = async (id) => {
    if (!id) return;

    try {
      const response = await getEvent(id);
      const event = _.get(response, 'items[0]', {});

      if (event) {
        formik.setValues({
          screen_id: event.screen_id || '',
          custom: Boolean(event.custom),
          start_date: moment(event.start_date).format('YYYY-MM-DD'),
          end_date: moment(event.end_date).format('YYYY-MM-DD'),
          start_time: parseApiTime(event.start_time),
          end_time: parseApiTime(event.end_time),
          priority: Boolean(event.priority),
          campaign_ids: event.campaign_ids || []
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const checkAvailability = async (values) => {
    try {
      const response = await checkAvailabilityEvent(values.screen_id, {
        start_date: moment(values.start_date).toISOString(),
        end_date: moment(values.end_date).toISOString(),
        start_time: getTime(values.start_time),
        end_time: getTime(values.end_time)
      });

      return _.get(response, 'items[0].availability', false);
    } catch (error) {
      console.log({ error });
    }

    return false;
  };

  const showAvailabilityStatus = async (availability) => {
    if (availability) {
      await modal.openModal(msgs.availableTitle, msgs.availableText);
    } else {
      await modal.openModal(msgs.notAvailableTitle, msgs.notAvailableText);
    }
  };

  const loadItems = async (endpoint) => {
    try {
      setLoading(true);
      const response = await get(endpoint);
      const items = _.get(response, 'data.result.items', []);

      setLoading(false);

      return items;
    } catch (error) {
      console.log({ error });
    }

    return [];
  };

  const onChangeCampaignIds = (event) => {
    const id = event.target.value;
    const campaign_ids = formik.values.campaign_ids.slice();
    const index = campaign_ids.findIndex((c_id) => Number(c_id) === Number(id));

    if (index === -1) {
      campaign_ids.push(id);
      formik.setFieldValue('campaign_ids', campaign_ids);
    }
  };

  const removeCampaignId = (campaign) => {
    const camp_id = campaign.id;
    const campaign_ids = formik.values.campaign_ids.slice();

    formik.setFieldValue(
      'campaign_ids',
      campaign_ids.filter((c_id) => Number(c_id) !== Number(camp_id))
    );
  };

  const onChangeCampaignOrder = (result) => {
    formik.setFieldValue(
      'campaign_ids',
      result.newItems.map((camp) => camp.id)
    );
  };

  const getSelectedCampaigns = (campaign_ids = []) => {
    const selected = [];

    for (let c_id of campaign_ids) {
      let item = campaigns.find((c) => Number(c.id) === Number(c_id));

      if (item) {
        selected.push(item);
      }
    }

    return selected;
  };

  const deleteEvent = async (id) => {
    try {
      setLoading(true);
      const response = await deleteRequest(`/events/${id}`);
      const result = _.get(response, 'data.result.items[0].is_deleted', false);

      setLoading(false);

      return result;
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    isEdit,
    formik,
    screens,
    campaigns,
    selectedCampaigns,
    loading,
    onChangeCampaignIds,
    onChangeCampaignOrder,
    removeCampaignId,
    deleteEvent,
    modal
  };
};
