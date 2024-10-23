import useAxios from '../../hooks/useAxios';
import { useGlobalApiError } from 'hooks/useGlobalApiError';

export const { get } = useAxios();

  const getFile = (host, filename) =>
    new Promise(async (res, rej) => {
      let route = host;

      try {
        let resImage = await get(route, { responseType: 'blob' });
        // console.log('resImage', resImage)

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

  export const getProfilePhoto = (userId, userData) =>
    new Promise(async (resolve) => {
      let result = null;
      const apiError = useGlobalApiError();
      try {
        apiError.disable();
        // get image from backend
        result = await getFile(userId, `user_${userData.id}.png`);
        // console.log('result', result)
        resolve(result);
      } catch (error) {
        // try {
        //   result = await getFile(default_image);
        //   resolve(result);
        // } catch (error) {
          resolve(null);
        // }
      }finally{
        apiError.enable();
      }
    });

