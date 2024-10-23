import { createContext, useMemo } from 'react';
import { config } from 'providers/config';
import { useMyInfo } from 'hooks/useMyInfo';

export const PermissionContext = createContext({});

export const PermissionProvider = (props) => {
  const { perms } = useMyInfo();
  const checkRoutePerms = config.siteConfig.checkRoutePerms;

  const value = useMemo(
    () => ({
      perms,
      checkRoutePerms
    }),
    [perms]
  );

  return <PermissionContext.Provider value={value} {...props} />;
};
