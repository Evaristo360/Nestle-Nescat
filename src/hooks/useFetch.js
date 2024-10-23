import { useState, useRef, useEffect } from 'react';

// TODO: Add response mappers & refetch event to update cache
const useFetch = (url) => {
  const cache = useRef({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);

      if (cache.current[url]) {
        const dataInCache = cache.current[url];

        setData(dataInCache);
        setLoading(false);
      } else {
        const response = await fetch(url);
        const responseData = await response.json();

        cache.current[url] = responseData;

        setData(responseData);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, data };
};

export { useFetch };
