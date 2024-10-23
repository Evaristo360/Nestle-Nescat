/* eslint-disable no-console */
import useLocalStorage from 'hooks/useLocalStorage';
import useAxios from '../../../hooks/useAxios';
import { useGlobalApiError } from 'hooks/useGlobalApiError';

function useVerifyPIN(onComplete, onError) {
  const { getItem, removeItem } = useLocalStorage();
  var axios = useAxios();
  const apiError = useGlobalApiError();

  async function onVerifyPIN({ pinValue }) {
    const recoveryToken = getItem('recovery-token');

    // console.log('recovery-token', recoveryToken);
    // console.log('pinValue', pinValue);

    if (!recoveryToken) {
      return onError();
    }

    const data = {
      pin: pinValue
    };

    apiError.disable();

    await axios
      .patch('/resetPassword', data, {
        headers: { 'Content-Type': 'application/json', token: recoveryToken }
      })
      .then((response) => {
        onComplete();
      })
      .catch((err) => {
        onError({ error: err.response.data.error });
      })
      .finally(() => {
        apiError.enable();
      });

    // onComplete();
  }

  return { onVerifyPIN };
}

export default useVerifyPIN;
