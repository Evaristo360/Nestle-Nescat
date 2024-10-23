import useAxios from './useAxios';
import { useState, useEffect } from 'react';
import _ from 'lodash';

const defaultEndpoint = '/route/of/items';

export const useItems = ({
  endpoint = defaultEndpoint,
  pathItems = 'data.result.items',
  params = {},
  debug = false
}) => {
  const { get } = useAxios();
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems(endpoint);
  }, []);

  const loadItems = async (endpoint = defaultEndpoint) => {
    if (endpoint === defaultEndpoint) {
      console.log('You must define an endpoint to request items');
      return;
    }

    try {
      if (debug) {
        console.log({ endpoint, params, pathItems });
      }

      const response = await get(endpoint, { params });
      const newItems = _.get(response, pathItems, []);

      setItems(newItems);
    } catch (error) {
      console.log({ error });
      if (debug) {
        console.log(`Request failed GET ${endpoint}, pathItems: ${pathItems}`, {
          error
        });
      }
    }
  };

  return items;
};
