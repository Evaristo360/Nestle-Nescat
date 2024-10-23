import { doPost, doPatch, doGet, doDelete } from 'hooks/useAxios';
export const editDigitalDisplay = (id, data) => doPatch(`/digital-display/${id}`, data);
export const deleteDigitalDisplay = (id) => doDelete(`/digital-display/${id}`);
export const getDigitalDisplay = (id) => doGet(`/digital-display/${id}`);
export const resetProductsDigitalDisplay = (idTotem) => doPost(`/digital-display/reset-products/${idTotem}`);

export const getClientList = () => doGet(`/clients/list`);
export const getBranchList = (id) => doGet(`/clients/${id}/branch/list`);
export const getProductList = ( id, search ) => doGet(`/branch/${id}/product/list` + (search !== '' ? `?search_item=${search}`  : ''));