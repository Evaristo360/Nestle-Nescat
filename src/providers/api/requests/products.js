import { doPost, doPatch, doGet, doDelete } from 'hooks/useAxios';
export const getAllProducts = (search_item) => doGet(`/products/list?`+(search_item ? `&search_item=${search_item}`  : ''));

export const addProduct = (data) => doPost(`/products`, data);
export const editProduct = (id, data) => doPatch(`/products/${id}`, data);
export const deleteProduct = (id) => doDelete(`/products/${id}`);
export const getProduct = (id) => doGet(`/products/${id}`);

export const getProductDivision = () => doGet(`/products/division`);
export const getProductCategory = (id) => doGet(`/products/category?division_id=${id}`);
export const getProductFormatEquivalence = (search_item) => doGet(`/products/format-equivalence/list?`+(search_item ? `search_item=${search_item}`  : ''));
export const getProductMaterialGroup = (id) => doGet(`/products/material-group/list?category_id=${id}`);
export const getProductListByMaterialGroup = (id,search_item) => doGet(`/products/list?material_group_id=${id}`+(search_item ? `&search_item=${search_item}`  : ''));
export const getProductMaterialSAP= (search_item) => doGet(`/products/sap/list?`+(search_item ? `search_item=${search_item}`  : ''));
export const getProductSKU = (search_item) => doGet(`/products/sku/list?`+(search_item ? `search_item=${search_item}`  : ''));