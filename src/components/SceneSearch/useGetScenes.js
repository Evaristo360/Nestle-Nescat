import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';

const useGetScenes = () => {
  const [scenes, updateScenes] = useState([]);
  const [totalScenes, updateTotalScenes] = useState(100);
  const [data, updateData] = useState({
    page_size: 10,
    page_number: 1,
    // status: 'all'
    // orderBy: 'id',
    search_item: ''
  });
  var axios = useAxios();

  useEffect(() => {
    getScenes(data);
  }, []);

  const getScenes = async function (filters) {
    updateData(Object.assign(data, filters));
    let params = {
      page_size: filters.page_size,
      page_number: filters.page_number
    };

    if (filters.search_item > 2) {
      params.search_item = filters.search_item;
    }
    //console.log({ params });

    try {
      let {
        data: { result }
      } = await axios.get('/scene', { params });

      updateScenes(result.items);
      updateTotalScenes(result.totalFound);
    } catch (err) {
      console.log(err);
    }
  };

  return [scenes, getScenes, totalScenes, data, updateData];
};

export default useGetScenes;
