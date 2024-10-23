import useAxios from 'hooks/useAxios';
import { useGlobalApiError } from 'hooks/useGlobalApiError';
import useLocalStorage from 'hooks/useLocalStorage';
import { createContext, useEffect, useMemo, useState } from 'react';
import { permissions } from 'providers/permission';

export const MyInfoContext = createContext({
  role: 0,
  perms: [],
  loading: false,
  userName: '',
  error: false
});

export const MyInfoProvider = (props) => {
  const { getItem } = useLocalStorage();
  const [role, updateRole] = useState(0);
  const [perms, updatePerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(false);
  const globalErorr = useGlobalApiError();
  const axios = useAxios();

  useEffect(() => {
    getUserMetadata();
  }, []);

  function getUserMetadata() {
    const user_id = Number(getItem('user_id'));
    const role_id = Number(getItem('role_id'));

    if (Object.is(user_id, NaN) || Object.is(role_id, NaN)) return;

    getEmployeeInfo();
  }

  function getEmployeeInfo() {
    globalErorr.disable();
    setLoading(true);
    axios
      .get(`/my-info`)
      .then((response) => {
        const result = _.get(response, 'data.result.items[0]', {});
        const newPerms = [];
        if (result.management) newPerms.push(permissions.management);
        if (result.advertisement) newPerms.push(permissions.advertisement);
        if (result.client_module) newPerms.push(permissions.client_module);
        if (result.analytics) newPerms.push(permissions.analytics);
        if (result.digital_display) newPerms.push(permissions.digital_display);
        if (result.product) newPerms.push(permissions.product);
        if (result.load_pts) newPerms.push(permissions.load_pts);
        if (result.customer) newPerms.push(permissions.customer);
        if (result.totem) newPerms.push(permissions.totem);
        if (result.branches) newPerms.push(permissions.branches);
        if (result.redemption_pts) newPerms.push(permissions.redemption_pts);
        if (result.purchase_request)
          newPerms.push(permissions.purchase_request);
        if (result.sale_off) newPerms.push(permissions.sale_off);
        updateRole(result.role_id);
        updatePerms(newPerms);
        setUserName(result.name);
        setUserData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => globalErorr.enable());
  }

  const value = useMemo(
    () => ({ role, perms, loading, userName, error, userData }),
    [role, perms, loading, userName, error, userData]
  );

  return <MyInfoContext.Provider value={value} {...props} />;
};
