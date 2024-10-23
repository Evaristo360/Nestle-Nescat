import { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import useLocalStorage from 'hooks/useLocalStorage';

function useSendPIN(onComplete, onError) {
  const [loading, updateLoadingStatus] = useState(false);
  const { post } = useAxios();
  const { setItem } = useLocalStorage();

  function onSendPIN(data) {
    console.log('ENVIANDO PIN', data);
    updateLoadingStatus(true);

    post('/forgotPassword', data)
      .then((response) => {
        updateLoadingStatus(false);
        setItem('recovery-token', response.data.result.token);
        onComplete();
      })
      .catch((err) => {
        updateLoadingStatus(false);
        onError({ error: err.response.data.error });
      });
  }

  return { loading, onSendPIN };
}

export default useSendPIN;
