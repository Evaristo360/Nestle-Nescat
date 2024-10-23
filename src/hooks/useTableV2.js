import { useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import useAxios from './useAxios';
import {useKeyPress} from './useKeyPress';
import { getResponseDataPath } from 'providers/responseDataPath';
import { tableConfig } from 'providers/tableConfig';

export const defaultPageSize = tableConfig.pageSize;
export const minLengthSearch = 3;
export const waitTimeTypingMilis = 300;

export const useTable = ({
  endpoint,
  debug = false,
  getPageSize = defaultPageSize,
  waitTimeMs = 0,
  enter = false
}) => {
  const { get } = useAxios();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [totalFound, setTotalFound] = useState(0);
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize);
  const [orderBy, setOrderBy] = useState('');
  const [extraParams, setExtraParams] = useState({});
  const [sendAll, setSendAll] = useState({});
  const isEnterPressed = useKeyPress({ key: "Enter" });

  useEffect(() => {
    search();
  }, [pageSize, page, orderBy, extraParams]);

  if(enter){
    useEffect(() => {
      if(isEnterPressed){
        search();
      }
    }, [isEnterPressed]);
  }else{
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        // Send Axios request here
        search();
      }, waitTimeMs);
  
      return () => clearTimeout(delayDebounceFn);
    }, [searchItem]);
  }

  const onChangeSearchItem = (event) => {
    setSearchItem(event.target.value);
  };
  const onChangePage = (page) => setPage(page);
  const onChangeSize = (size) => {
    setPage(1);
    setPageSize(size);
  };

  const search = async () => {
    setLoading(true);
    const params = getParams();
    if (debug) console.log(`Params for GET ${endpoint} request: `, { params });

    try {
      const response = await get(endpoint, { params });
      const dataPath = getResponseDataPath(response);
      const newItems = _.get(response, `${dataPath}.items`, []);
      const newTotalFound = _.get(response, `${dataPath}.totalFound`, 0);

      if (debug) console.log('Result items search: ', newItems);

      setItems(newItems);
      setTotalFound(newTotalFound);
      setSendAll(response.data);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const getExtraParams = () =>
    Object.keys(extraParams).reduce((acc, paramKey) => {
      if (
        extraParams[paramKey] !== '' &&
        extraParams[paramKey] !== null &&
        extraParams[paramKey] !== undefined
      ) {
        acc[paramKey] = extraParams[paramKey];
      }

      return acc;
    }, {});

  const getParams = () => {
    const params = {
      ...getExtraParams(),
      page_size: pageSize,
      page_number: page
    };

    if (searchItem && searchItem.length >= minLengthSearch) {
      params.search_item = searchItem;
    }

    if (orderBy) {
      params.order_by = orderBy;
    }

    return params;
  };

  const addExtraParams = (params = {}) =>
    setExtraParams({ ...extraParams, ...params });

  const resetFilters = () => {
    setPage(1);
    setPageSize(defaultPageSize);
    setSearchItem('');
    setOrderBy('');
    setExtraParams({});
  };

  return {
    page,
    pageSize,
    totalFound,
    searchItem,
    items,
    onChangeSize,
    onChangePage,
    onChangeSearchItem,
    search, // use with precaution,
    resetFilters,
    setOrderBy,
    extraParams,
    setExtraParams,
    addExtraParams,
    sendAll,
    loading
  };
};
