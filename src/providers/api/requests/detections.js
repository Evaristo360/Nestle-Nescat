import { doPost, doPatch, doGet, doDelete, doGetFile } from 'hooks/useAxios';

export const getExcel = (page_size, page_number, search, client_id, device_id, branch_id) => doGetFile(
    `/analytics/detections/excel?page_size=${page_size}&page_number=${page_number}` 
        + (search !== '' ? `&search_item=${search}`  : '')  
        + (client_id !== undefined ? `&client_id=${client_id}`  : '')  
        + (branch_id !== undefined ? `&branch_id=${branch_id}`  : '')
        + (device_id !== undefined ? `&device_id=${device_id}`  : '')
);