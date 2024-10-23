/* eslint-disable no-underscore-dangle */
import { instance } from '../instance';

export const getExample = (payload) => instance.get('examples', payload);

export const addExample = (payload) => instance.post(`examples`, payload);

export const deleteExample = (payload) =>
  instance.delete(`examples/${payload.id}`);

export const updateExample = (payload) =>
  instance.put(`examples/${payload.id}`, payload.updatedProperty);
