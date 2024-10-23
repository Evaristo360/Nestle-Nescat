import { useState } from 'react';
import useAxios from 'hooks/useAxios';
import useLocalStorage from 'hooks/useLocalStorage';
import _ from 'lodash';
import { useGlobalApiError } from 'hooks/useGlobalApiError';

function useSignIn(onComplete, onError) {
  const [loading, updateLoadingStatus] = useState(false);
  const { post } = useAxios();
  const { setItem } = useLocalStorage();
  const apiError = useGlobalApiError();

  function onSignIn(signInData) {
    updateLoadingStatus(true);
    apiError.disableForCodes([400, 401]);
    post('/authenticate', signInData)
      .then((response) => {
        updateLoadingStatus(false);
        setItem(
          'user_id',
          _.get(response, 'data.result.user.id', 'no-user-id')
        );
        setItem('token', _.get(response, 'data.result.token', 'no-token'));
        setItem(
          'permissions',
          JSON.stringify(
            _.get(response, 'data.result.user.permissions', 'no-perms')
          )
        );
        setItem(
          'role_id',
          JSON.stringify(
            _.get(response, 'data.result.user.role_id', 'no-role-id')
          )
        );
        setItem(
          'client_id',
          JSON.stringify(
            _.get(response, 'data.result.user.client_id', 'no-client-id')
          )
        );
        onComplete();
      })
      .catch((err) => {
        const status = _.get(err, 'response.status', false);
        updateLoadingStatus(false);
        //onError({ error: err.response.data.error });
        if (status < 500) {
          onError({ error: err.message });
        }
      })
      .finally(() => {
        apiError.enableForAllCodes();
      });
  }

  return { loading, onSignIn };
}

export default useSignIn;
