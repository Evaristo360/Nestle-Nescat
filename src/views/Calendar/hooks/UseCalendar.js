import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import moment from 'moment';

export const useCalendar = () => {
  const [defaultDate, updateDefaultDate] = useState(new Date());
  const [screens, updateScreens] = useState([]);
  const [selectedScreens, updateSelectedScreens] = useState([]);
  const [events, updateEvents] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    SearchScreens();
    getAllDaysOfYear();
  }, []);

  useEffect(() => {
    getEvents();
  }, [selectedScreens]);

  const SearchScreens = (value) => {
    const axios = useAxios();
    // const params = {
    //   page_number: 1,
    //   page_size: 10
    // };

    axios
      .get(`/screen`)
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

  const removeSelected = (item) => {
    let newArray = [...selectedScreens];

    newArray.splice(
      selectedScreens.findIndex((i) => i.id === item.id),
      1
    );
    updateSelectedScreens(newArray);
  };

  const getEvents = () => {
    if (selectedScreens.length > 0) {
      let screen_ids = selectedScreens.map((s) => s.id).join(',');

      axios
        .get(`/events?screen_ids=${screen_ids}`)
        .then((response) => {
          const events = formatEvents(response.data.result.items);

          updateEvents(events);
        })
        .finally(() => {
          // updateLoadingCampaigns(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateEvents([]);
    }
  };

  const getDateWithoutTime = (date = '') => {
    let dateFormated = new Date(date);
    let month = dateFormated.getMonth();
    let year = dateFormated.getFullYear();
    let day = dateFormated.getDate();

    return new Date(year, month, day);
  };

  const formatEvents = (items = []) => {
    const events = items.map((e) => ({
      title: e.id,
      start_date: getDateWithoutTime(e.start_date),
      end_date: getDateWithoutTime(e.end_date),
      always: !Boolean(e.custom),
      resource: e
    }));

    return events;
  };

  const getAllDaysOfYear = () => {
    const january = 0,
      december = 11;
    const currentYear = new Date().getFullYear();
    const lastDayYear = new Date(currentYear, december, 31);
    const daysOfYear = [];

    for (
      let d = new Date(currentYear, january, 1);
      d <= lastDayYear;
      d.setDate(d.getDate() + 1)
    ) {
      daysOfYear.push(new Date(d));
    }

    return daysOfYear;
  };

  return {
    methods: {
      updateDefaultDate,
      SearchScreens,
      updateScreens,
      updateSelectedScreens,
      removeSelected,
      getEvents
    },
    list: {
      screens,
      selectedScreens,
      events
    }
  };
};
