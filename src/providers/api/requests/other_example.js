/* eslint-disable no-underscore-dangle */
import { instance } from '../instance';

export const getOtherExample = (payload) =>
  instance.get('other-examples', payload);

export const addOtherExample = (payload) =>
  instance.post(`other-examples`, payload);

export const deleteOtherExample = (payload) =>
  instance.delete(`other-examples/${payload.id}`);

export const updateOtherExample = (payload) =>
  instance.put(`other-examples/${payload.id}`, payload.updatedProperty);
