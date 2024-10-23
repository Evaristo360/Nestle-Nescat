import { doPost, doPatch, doGet, doDelete, doGetFile } from 'hooks/useAxios';
export const getAllRedemPoints = () => doGet(`/redeem-point`);

export const addRedemPoints = (data) => doPost(`/redeem-point`, data);
export const editRedemPoints = (id, data) => doPatch(`/redeem-point/${id}`, data);
export const deleteRedemPoints = (id) => doDelete(`/redeem-point/${id}`);
export const getRedemPoints = (id) => doGet(`/redeem-point/${id}`);

export const getRedemPointsExcel = (page_size,page_number,search) => doGetFile(
    `/redeem-point/product-redeem/report/excel?page_size=${page_size}&page_number=${page_number}` + (search !== '' ? `&search_item=${search}`  : '') 
);
export const getReportRedemPointsExcel = (page_size,page_number,search, params) => doGetFile(
    `/redeem-point/registry/report/excel?page_size=${page_size}&page_number=${page_number}` + (search !== '' ? `&search_item=${search}`  : ''),
    params 
);
