import { doPost, doPatch, doGet, doDelete } from 'hooks/useAxios';

//filter apis
export const getNestleAnalyticsClients = () => doGet(`/analytics/client/list`);
export const getNestleAnalyticsBranches = (client_id) => doGet(`/analytics/client/${client_id}/branch/list`);
export const getNestleAnalyticsDevices = () => doGet(`/analytics/device/list`);


//  >>>Ruta para totales (usarios, productos, interacciones y sucursales registrados)
export const getNestleAnalyticsTotals = (
    client_id, 
    branch_id, 
    device_id, 
    datetime_lower_bound, 
    datetime_upper_bound
) => 
doGet(
    `/analytics/registry?`
    + (client_id ? `&client_id=${client_id}`  : '')
    + (branch_id ? `&branch_id=${branch_id}`  : '')
    + (device_id ? `&device_id=${device_id}`  : '')
    + (datetime_lower_bound ? `&datetime_lower_bound=${datetime_lower_bound}`  : '')
    + (datetime_upper_bound ? `&datetime_upper_bound=${datetime_upper_bound}`  : '')
);

//  >>>Ruta para obtener interacciones por genero y edad
export const getNestleAnalyticsGenderAndAge = (
    client_id, 
    branch_id, 
    device_id, 
    datetime_lower_bound, 
    datetime_upper_bound
) => 
doGet(
    `/analytics/interaction?`
    + (client_id ? `&client_id=${client_id}`  : '')
    + (branch_id ? `&branch_id=${branch_id}`  : '')
    + (device_id ? `&device_id=${device_id}`  : '')
    + (datetime_lower_bound ? `&datetime_lower_bound=${datetime_lower_bound}`  : '')
    + (datetime_upper_bound ? `&datetime_upper_bound=${datetime_upper_bound}`  : '')
);

//  >>>Ruta para mostrar emociones
export const getNestleAnalyticsEmotions = (
    client_id, 
    branch_id, 
    device_id, 
    datetime_lower_bound, 
    datetime_upper_bound
) => 
doGet(
    `/analytics/emotion?`
    + (client_id ? `&client_id=${client_id}`  : '')
    + (branch_id ? `&branch_id=${branch_id}`  : '')
    + (device_id ? `&device_id=${device_id}`  : '')
    + (datetime_lower_bound ? `&datetime_lower_bound=${datetime_lower_bound}`  : '')
    + (datetime_upper_bound ? `&datetime_upper_bound=${datetime_upper_bound}`  : '')
);

//  >>>Ruta para mostrar top 5 de ordenes de compra
export const getNestleAnalyticsTopPurchaseRequest = (
    client_id, 
    branch_id, 
    device_id, 
    datetime_lower_bound, 
    datetime_upper_bound
) => 
doGet(
    `/analytics/top/purchase-request?`
    + (client_id ? `&client_id=${client_id}`  : '')
    + (branch_id ? `&branch_id=${branch_id}`  : '')
    + (device_id ? `&device_id=${device_id}`  : '')
    + (datetime_lower_bound ? `&datetime_lower_bound=${datetime_lower_bound}`  : '')
    + (datetime_upper_bound ? `&datetime_upper_bound=${datetime_upper_bound}`  : '')
);

//  >>>Ruta para mostrar top de productos canjeados
export const getNestleAnalyticsTopRedeemProducts = (
    client_id, 
    branch_id, 
    device_id, 
    datetime_lower_bound, 
    datetime_upper_bound
) => 
doGet(
    `/analytics/top/product-redeem?`
    + (client_id ? `&client_id=${client_id}`  : '')
    + (branch_id ? `&branch_id=${branch_id}`  : '')
    + (device_id ? `&device_id=${device_id}`  : '')
    + (datetime_lower_bound ? `&datetime_lower_bound=${datetime_lower_bound}`  : '')
    + (datetime_upper_bound ? `&datetime_upper_bound=${datetime_upper_bound}`  : '')
);

//  >>>Ruta para mostrar top 5 de carga de puntos
export const getNestleAnalyticsTopLoadProducts = (
    client_id, 
    branch_id, 
    device_id, 
    datetime_lower_bound, 
    datetime_upper_bound
) => 
doGet(
    `/analytics/top/product-load?`
    + (client_id ? `&client_id=${client_id}`  : '')
    + (branch_id ? `&branch_id=${branch_id}`  : '')
    + (device_id ? `&device_id=${device_id}`  : '')
    + (datetime_lower_bound ? `&datetime_lower_bound=${datetime_lower_bound}`  : '')
    + (datetime_upper_bound ? `&datetime_upper_bound=${datetime_upper_bound}`  : '')
);
