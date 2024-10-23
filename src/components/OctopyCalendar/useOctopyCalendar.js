import { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';

export const getCurrentMonth = () => {
  const today = new Date();

  return today.getMonth();
};

export const getAllDays = () => {
  const currentYear = new Date().getFullYear();

  const lastDayYear = new Date(currentYear, 11, 31);

  const daysOfYear = [];

  for (
    let d = new Date(currentYear, 0, 1);
    d <= lastDayYear;
    d.setDate(d.getDate() + 1)
  ) {
    daysOfYear.push(new Date(d));
  }

  return daysOfYear;
};

export const getPrevMonth = (month) => {
  return month === 1 ? 11 : month - 1;
};

export const getCurrentYear = () => new Date().getFullYear();

export const backNDays = (date = new Date(), n = 1) => {
  date.setDate(date.getDate() - n);

  return date;
};

export const getDaysOfMonth = (month = 0, year = getCurrentYear()) => {
  let weeks = [];
  let firstDisplayDay = new Date(year, month, 1);
  let indexFirstDisplayDay = firstDisplayDay.getDay();

  if (indexFirstDisplayDay !== 0) {
    firstDisplayDay = backNDays(firstDisplayDay, indexFirstDisplayDay);
  }

  let day = firstDisplayDay;

  for (let week of [0, 1, 2, 3, 4]) {
    if (!weeks[week]) weeks.push([]);
    for (let d of [0, 1, 2, 3, 4, 5, 6]) {
      weeks[week].push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
  }

  return weeks;
};

export const getFirstDayOfYear = (year = getCurrentYear()) => {
  let first = new Date(year, 0, 1);

  return first;
};

export const getLastDayOfYear = (year = getCurrentYear()) => {
  let last = new Date(year, 11, 31);

  return last;
};

const formatDayEvents = (events = [], currentYear) => {
  if (events.length === 0) return;
  let dayEvents = getAllDaysOfYearWithEmptyEventList();

  for (let event of events) {
    let start_date = event.always
        ? getFirstDayOfYear(currentYear)
        : event.start_date,
      end_date = event.always ? getLastDayOfYear(currentYear) : event.end_date;

    dayEvents = fillEventListWithInterval(
      event,
      start_date,
      end_date,
      dayEvents
    );
  }

  return dayEvents;
};

const fillEventListWithInterval = (
  event = {},
  start_date = new Date(),
  end_date = new Date(),
  dayEvents = {}
) => {
  for (
    let date = start_date;
    date <= end_date;
    date.setDate(date.getDate() + 1)
  ) {
    let isoString = date.toISOString();

    if (dayEvents[isoString]) {
      dayEvents[isoString].push(event);
    }
  }

  return dayEvents;
};

const getAllDaysOfYearWithEmptyEventList = () => {
  let allDaysList = getAllDays();
  let result = allDaysList.reduce((acc, day) => {
    acc[day.toISOString()] = [];

    return acc;
  }, {});

  return result;
};

export const useOctopyCalendar = ({ events = [], onClickEvent }) => {
  moment.locale('es');
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [dayEvents, setDayEvents] = useState({});
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(getCurrentYear());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setDaysOfMonth(getDaysOfMonth(month, year));
  }, [month, year]);

  useEffect(() => {
    let result = formatDayEvents(events, year);

    setDayEvents(result);
  }, [events.length]);

  const getDayOfMonth = (daysOfMonth, week, day) =>
    _.get(daysOfMonth, `[${week}][${day}]`, new Date());

  const getDayEvents = (day = new Date()) =>
    _.get(dayEvents, day.toISOString(), []);

  const handleClickEvent = ({ date, event }) => {
    if (onClickEvent) {
      onClickEvent(event, date);
    }
  };

  const getDisplayMonthAndYear = () => {
    let date = moment(new Date(year, month, 1)).format('MMMM YYYY');

    return date;
  };

  const goPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const goToday = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    setYear(year);
    setMonth(month);
  };

  const goToDate = (date = new Date()) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    setYear(year);
    setMonth(month);
  };

  const onChangeSelectedDate = (date = new Date()) => {
    goToDate(date);
    setSelectedDate(date);
  }

  return {
    daysOfMonth,
    getDayOfMonth,
    getDayEvents,
    handleClickEvent,
    getDisplayMonthAndYear,
    goPrevMonth,
    goNextMonth,
    goToday,
    goToDate,
    selectedDate,
    onChangeSelectedDate
  };
};
