/* eslint-disable no-param-reassign */
import _ from 'lodash';
import axios from 'axios';
import { config } from 'providers/config';
import useLocalStorage from 'hooks/useLocalStorage';
import { renderGlobalError } from 'providers/renderGlobalError';


export const instance = axios.create({
  baseURL: config.siteConfig.apiUrl,
  headers: {
    'Access-Control-Allow-Origin': true
  },
  timeout: 1000000
});

instance.interceptors.request.use((config) => {
  const { getItem } = useLocalStorage();
  const token = getItem('token');

  if (token) config.headers.token = token;

  return config;
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    renderGlobalError(error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
