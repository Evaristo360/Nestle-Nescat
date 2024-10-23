import { doPost, doPatch, doGet, doDelete, doGetFile } from 'hooks/useAxios';

//Product Filter
export const getFilterProductDivision = () => doGet(`/products/division/list`);
export const getFilterProductCategory = (id) => doGet(`/products/division/${id}/category/list`);
export const getFilterProductMaterialGroup = (id) => doGet(`/products/category/${id}/material-group/list`);

//Client Filter
export const getFilterClients = () => doGet(`/clients/list`);

//Branch Filter

export const getFilterBranchesByClient= (id) => doGet(`/clients/${id}/branch/list`);
export const getFilterBranchFormat = () => doGet(`/branch/format/list`);
export const getFilterBranchRegion = () => doGet(`/branch/region/list`);
export const getFilterBranchSubformat = () => doGet(`/branch/subformat/list`);


export const getLoadPointsExcel = (page_size,page_number,search, params) => doGetFile(
    `/load_points/report/excel?page_size=${page_size}&page_number=${page_number}` + (search !== '' ? `&search_item=${search}`  : ''),
    params 
);

//Fill Pending Request Form
//Client List usa la misma ruta que getFilterClients
//Region List usa la misma ruta que getFilterBranchRegion

export const getBranchConnectionList = ( client_id, region_id, search ) => doGet(`/load_points/client/${client_id}/region/${region_id}/branch/list` + (search !== '' ? `?search_item=${search}`  : ''));
export const getBranchOfflineList = ( search ) => doGet(`/load_points/pending_request/list/branch_offline` + (search !== '' ? `?search_item=${search}`  : ''));

//Pending Request 
export const getPendingRequest = ( id ) => doGet(`/load_points/pending_request/${id}`);
export const validatePendingRequest = ( id, data ) => doPatch(`/load_points/pending_request/${id}`, data);
export const discardPendingRequest = ( id ) => doDelete(`/load_points/pending_request/${id}`);
export const revertToPendingRequest = ( id ) => doPatch(`/load_points/pending_request/cancel/${id}`);


//Fill Pending Request Product Form
//Divsion List usa la misma ruta que getFilterProductDivision
//Category List usa la misma ruta que getFilterProductCategory
//MaterialGroup List usa la misma ruta que getFilterProductMaterialGroup
export const getPendingRequestProductList = ( id ) => doGet(`/products/material-group/${id}/list`);

//Load products to ticket
export const addProductListToTicket = (data) => doPost(`/load_points/pending_request/product`, data);

