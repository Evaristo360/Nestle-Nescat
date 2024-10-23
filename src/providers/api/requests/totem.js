import { doPost, doPatch, doGet, doDelete } from 'hooks/useAxios';
export const editTotem = (id, data) => doPatch(`/totem/${id}`, data);
export const deleteTotem = (id) => doDelete(`/totem/${id}`);
export const getTotem = (id) => doGet(`/totem/${id}`);

export const getTotemClientList = () => doGet(`/clients/list`);
export const getTotemBranchList = (id) => doGet(`/clients/${id}/branch/list`);
export const getTotemProductList = ( id, search ) => doGet(`/branch/${id}/product/list` + (search !== '' ? `?search_item=${search}`  : ''));