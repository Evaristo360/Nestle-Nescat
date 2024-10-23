import { useContext } from 'react';
import { Route } from 'react-router-dom';
import { PermissionContext } from 'providers/permission';

export const PrivateRoute = ({
  exact = true,
  path = '',
  component = null,
  perm = ''
}) => {
  const { perms, checkRoutePerms } = useContext(PermissionContext);

  if (perms.length > 0 && perm && checkRoutePerms) {
    let hasPerm = perms.find((p) => p === perm);
    //console.log({ hasPerm, perm });
    if (!hasPerm) return null;
  }

  return <Route exact={exact} path={path} component={component} />;
};
