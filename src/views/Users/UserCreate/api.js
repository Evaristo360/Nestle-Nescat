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

  const getPerms = async (endpoint) =>
    new Promise(async (res, rej) => {
      try {
        let response = await get(endpoint);

        if (response.data) {
          let result = response.data;

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

  const doPut = (endpoint, data) =>
    new Promise(async (resolve, reject) => {
      try {
        let response = await post(endpoint, data);

        if (!response.data.error) {
          resolve(response.data.result);
        } else reject(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });

  const doPatch = (endpoint, data) =>
    new Promise(async (resolve, reject) => {
      try {
        let response = await patch(endpoint, data);

        if (!response.data.error) {
          resolve(response.data.result);
        } else reject(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });

  const getFile = (host, filename) =>
    new Promise(async (res, rej) => {
      let route = host + filename;

      try {
        let resImage = await get(route, { responseType: 'blob' });

        if (resImage.data) {
          res(
            new File([resImage.data], filename, {
              type: `image/${filename.split('.')[1]}`
            })
          );
        } else {
          rej(resImage);
        }
      } catch (error) {
        rej(error);
      }
    });

  const getProfilePhoto = (userId, default_image) =>
    new Promise(async (resolve) => {
      let result = null;

      // try {
      //   // get image from backend
      //   result = await getFile(`/userImages/`, `user_${userId}.png`);
      //   resolve(result);
      // } catch (error) {
        try {
          result = await getFile(`/userImages/`, 'default.png');
          resolve(result);
        } catch (error) {
          resolve(null);
        }
      //}
    });

  return {
    getMyInfo: () => doGet('/my-info'),

    updateMyInfo: (data) => doPatch('/my-info', data),

    getUserById: (id) => doGet(`/users/${id}`),

    getClientById: (id) => doGet(`/clients/${id}`),

    updateUser: (data) => doPut('/users', data),

    updateClient: (data) => doPut('/clients', data),

    resetPassword: (old_password, new_password) =>
      doPatch('/resetPassword', { new_password, old_password }),

    getProfilePhoto,

    getFile,

    doPut,

    doGet,

    getPerms
  };
};

export default useApi;
