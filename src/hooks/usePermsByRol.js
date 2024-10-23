import { useState, useEffect } from 'react';
import _ from 'lodash';
import useAxios from 'hooks/useAxios';
import { roles } from 'providers/role';
import useLocalStorage from 'hooks/useLocalStorage';

export const usePermsByRol = ({ role_id }) => {
  const [permisosByRol, setPermisosByRol] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    getRolInfo();
  }, []);

  function getRolInfo() {
    axios
      .get(`/role/${role_id}`)
      .then((response) => {
        const result = _.get(response, 'data.items[0].permissionList', {});
        setPermisosByRol(result)

      })
      .catch((err) => console.log({err}));
  }

  return { permisosByRol };
};

