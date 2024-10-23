import { doPatch, doGet } from 'hooks/useAxios';
import { instance } from '../instance';

export const getUser = (id) => doGet(`/users/${id}`);
export const getUserImage = (image_url) =>
  instance.get(image_url, { responseType: 'blob' });
export const createUser = (data) => instance.post(`/users`, data);
export const updateUser = (id, data) => doPatch(`/users/${id}`, data);
