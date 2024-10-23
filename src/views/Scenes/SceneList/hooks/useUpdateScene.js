import useAxios from 'hooks/useAxios';

export const useUpdateScene = () => {
  const axios = useAxios();

  return {
    deleteScene: async (id, filters, callback) => {
      try {
        let {
          data: { result }
        } = await axios.get(`/scene/${id}`);
        var scene = result.items[0];
        var newData = {
          resolution_id: scene.resolution_id,
          color: scene.color,
          name: scene.name,
          is_active: false
        };

        try {
          let { data } = await axios.patch(`/scene/${id}`, newData);
          // let { data } = await axios.deleteRequest(`/scene/${id}`, {
          //   params: { type: 'delete' }
          // });

          callback(filters);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    },
    activeScene: async (id, filters, callback) => {
      try {
        let {
          data: { result }
        } = await axios.get(`/scene/${id}`);
        var scene = result.items[0];
        var newData = {
          resolution_id: scene.resolution_id,
          color: scene.color,
          name: scene.name,
          is_active: true
        };

        try {
          let { data } = await axios.patch(`/scene/${id}`, newData);
          // let { data } = await axios.deleteRequest(`/scene/${id}`, {
          //   params: { type: 'delete' }
          // });

          callback(filters);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
};
