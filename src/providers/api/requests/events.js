import { doPost, doPatch, doGet } from 'hooks/useAxios';

export const addEvent = (data) => doPost('/events', data);
export const editEvent = (id, data) => doPatch(`/events/${id}`, data);
export const getEvent = (id) => doGet(`/events/${id}`);
export const checkAvailabilityEvent = (screenId, params) =>
  doGet(`/events/screen/${screenId}/availability`, params);
