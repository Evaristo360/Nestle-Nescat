import { doDelete, doPatch, doPost, doGet } from 'hooks/useAxios';

export const deleteResolution = (id) => doDelete(`/resolution/${id}`);
export const updateResolution = (id, data) => doPatch(`/resolution/${id}`, data);
export const createResolution = (data) => doPost('/resolution', data);
export const getResolutionById = (id) => doGet(`/resolution/${id}`);
