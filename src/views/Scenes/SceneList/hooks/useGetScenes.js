import { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import moment from 'moment';

const useGetScenes = () => {
  const [scenes, updateScenes] = useState([]);
  const [totalScenes, updateTotalScenes] = useState(100);
  var axios = useAxios();

  useEffect(() => {
    getScenes({
      pageSize: 10,
      page: 1,
      status: 'all',
      orderBy: '',
      date: '',
      query: ''
    });
  }, []);

  const getScenes = async function (filters) {
    var data = {
      page_number: filters.page,
      page_size: filters.pageSize
    };

    if (filters.status !== 'all') data.is_active = filters.status;
    if (filters.orderBy !== '') data.order_by = filters.orderBy;
    if (filters.query !== '') data.search_item = filters.query;
    if (filters.date !== '')
      data.start_date = moment(filters.date, 'YYYY-MM-DD').utc().toISOString();

    try {
      let {
        data: { result }
      } = await axios.get('/scene', { params: data });
      let newScenes = result.items;

      updateScenes(newScenes);
      updateTotalScenes(result.totalFound);
    } catch (err) {
      console.log(err);
    }
  };

  return [scenes, getScenes, totalScenes];
};

export default useGetScenes;
