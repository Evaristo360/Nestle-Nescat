import { doPost, doPatch, doGet, doDelete, doGetFile } from 'hooks/useAxios';

//Product Filter
export const getFilterClientListSaleOff = () => doGet(`/sale-off/client/list`);
export const getFilterBranchByIdListSaleOff = (client_id) => doGet(`/sale-off/branch/list/${client_id}`);
export const getFilterTypeSaleOff = () => doGet(`/sale-off/type/list`);


//Promotions
export const deletePromotion= (id) => doDelete(`/sale-off/`+id);

export const getPromotionsExcel = (page_size,page_number,search, params) => doGetFile(
    `/sale-off/report/excel?page_size=${page_size}&page_number=${page_number}` + (search !== '' ? `&search_item=${search}`  : ''),
    params 
);