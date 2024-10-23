import useAxios from '../../../hooks/useAxios';

const useApi = () => {
  const { post, get, put, patch } = useAxios();

  const doGet = async (endpoint) =>
    new Promise(async (res, rej) => {
      try {
        let response = await get(endpoint);

        if (response.data && response.data.result) {
          let result = response.data.result;

          if (result.items) {
            res({ ...result.items[0] });
          } else {
            res({ ...result });
          }
        } else rej();
      } catch (error) {
        rej();
      }
    });

  return {
    getClients: (id) => doGet(`/clients`),
    getBranchs: (id) => doGet(`/clients`)
  };
};

export default useApi;
