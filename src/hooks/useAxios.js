import _ from 'lodash';
import { getResponseDataPath } from 'providers/responseDataPath';
import { instance } from 'providers/api/instance';

function useAxios() {
  return {
    get: instance.get,
    post: instance.post,
    deleteRequest: instance.delete,
    put: instance.put,
    patch: instance.patch
  };
}

export const doGet = async (endpoint, params) => {
  try {
    let response = await instance.get(endpoint, { params });
    let dataPath = getResponseDataPath(response);
    let data = _.get(response, dataPath, {});

    return data;
  } catch (error) {
    console.log({ error });
  }
};

export const doPut = async (endpoint, data) => {
  try {
    let response = await instance.put(endpoint, data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const doPatch = async (endpoint, data) => {
  try {
    let response = await instance.patch(endpoint, data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const doPost = async (endpoint, data) => {
  try {
    let response = await instance.post(endpoint, data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const doDelete = async (endpoint, data) => {
  try {
    let response = await instance.delete(endpoint, data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const doGetFile = async (endpoint, params ) => {
  try {
    let response = await instance.get(endpoint, { responseType: 'blob', params:params });
    let dataPath = getResponseDataPath(response);
    let data = _.get(response, dataPath, {});

    return data;
  } catch (error) {
    console.log({ error });
  }
};

export default useAxios;
