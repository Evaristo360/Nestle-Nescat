import { doPost, doPatch, doGet, doDelete, doGetFile } from 'hooks/useAxios';

export const getExcelAllCustomers = (page_size,page_number,search) => doGetFile(
    `/customer/dashboard/report/excel?page_size=${page_size}&page_number=${page_number}` + (search !== '' ? `&search_item=${search}`  : '') 
);

export const getExcelAllCoincidences = (page_size,page_number,search) => doGetFile(
    `/purchase-request/product/report/excel?page_size=${page_size}&page_number=${page_number}` + (search !== '' ? `&search_item=${search}`  : '') 
);

export const getReportcustomersExcel = (page_size,page_number,search) => doGetFile(
    `/redeem-point/registry/report/excel?page_size=${page_size}&page_number=${page_number}` + (search !== '' ? `&search_item=${search}`  : '') 
);

export const getCustomReportLoad_Points = (id) => doGetFile(
    `/load_points/customer/${1}/report/excel`
);

export const getCustomReport = (url) => doGetFile(
    url
);
