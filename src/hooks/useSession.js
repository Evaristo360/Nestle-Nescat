import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { decodeToken } from 'react-jwt';
import useLocalStorage from 'hooks/useLocalStorage';

export const useSession = () => {
  const history = useHistory();
  const { getItem, removeItem } = useLocalStorage();

  useEffect(() => {
    const token = getItem('token');

    checkTokenExpired(token);
  }, []);

  function checkTokenExpired(token) {
    let time = getSessionTimeLeft(token);

    setTimeout(() => {
      onLogout();
    }, time);
  }

  function getSessionTimeLeft(token) {
    let data = decodeToken(token);
    let exp = moment(data.exp * 1000);
    let now = moment();

    return exp.diff(now);
  }

  function onLogout() {
    removeItem('user_id');
    removeItem('role_id');
    removeItem('client_id');
    removeItem('token');
    removeItem('permissions');
    history.replace('/');
  }

  return { onLogout };
};
