import { doPost, doPatch, doGet, doDelete, doGetFile } from 'hooks/useAxios';

export const getPurchaseRequestExcel = (page_size,page_number,search, params) => doGetFile(
    `/purchase-request/report/excel?page_size=${page_size}&page_number=${page_number}` + (search !== '' ? `&search_item=${search}`  : ''),
    params 
);