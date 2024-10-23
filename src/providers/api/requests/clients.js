import { doPost, doPatch, doGet, doDelete } from 'hooks/useAxios';
export const getAllClients = () => doGet(`/clients`);

export const addClient = (data) => doPost(`/clients`, data);
export const editClient = (id, data) => doPatch(`/clients/${id}`, data);
export const deleteClient = (id) => doDelete(`/clients/${id}`);
export const getClient = (id) => doGet(`/clients/${id}`);