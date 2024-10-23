import { doPost, doPatch, doGet, doDelete } from 'hooks/useAxios';

export const getAllBranches = () => doGet(`/branch/list`)

export const addBranchOffice = (data) => doPost(`/branch`, data);
export const editBranchOffice = (id, data) => doPatch(`/branch/${id}`, data);
export const deleteBranchOffice = (id) => doDelete(`/branch/${id}`);
export const getBranchOffice = (id) => doGet(`/branch/${id}`);

export const getBranchOfficeProduct = (branch_Office_Id,branch_Product_Id) => doGet(`/branch/${branch_Office_Id}/product/${branch_Product_Id}`);

export const getBranchFormats = () => doGet(`/branch/format`);
export const getBranchSubformats = (search) => doGet(`/branch/subformat` + (search !== '' ? `?search_item=${search}` : ''));
export const getBranchRegion = () => doGet(`/branch/region`);
export const getBranchClient = () => doGet(`/clients/list`);
export const getClientUrls = (client_id) => doGet(`/branch/client/${client_id}/url/`);

//redeem
export const getBranchProductsRedeem = () => doGet(`/redeem-point/product-redeem/list`);

export const addBranchRedeem = (branch_id, data) => doPost(`/branch/${branch_id}/product-branch-redeem`, data);
export const editBranchRedeem = (branch_id, id, data) => doPatch(`/branch/${branch_id}/product-branch-redeem/${id}`, data);
export const deleteBranchRedeem = (branch_id, id) => doDelete(`/branch/${branch_id}/product-branch-redeem/${id}`);
export const getBranchRedeem = (branch_id, id) => doGet(`/branch/${branch_id}/product-branch-redeem/${id}`);

