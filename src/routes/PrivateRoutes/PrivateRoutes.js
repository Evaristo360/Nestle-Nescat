import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import AppSidebar from 'components/AppSidebar';
import { useTheme } from 'hooks/useTheme';
import useUserThemes from 'hooks/useUserThemes';
import BaseLayout from 'layouts/BaseLayout';
import PrivateScreenLayout from 'layouts/PrivateScreenLayout';
import { useSession } from 'hooks/useSession';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { PermissionProvider } from 'providers/permission';
import { useGlobalApiError } from 'hooks/useGlobalApiError';
import { MyInfoProvider } from 'providers/myInfoProvider';

export const PrivateRoutes = () => {
  const { updateThemes } = useTheme();
  const apiError = useGlobalApiError();
  apiError.enable();

  useUserThemes({ updateThemes });
  const { onLogout } = useSession();

  return (
    <MyInfoProvider>
      <PermissionProvider>
        <BaseLayout>
          <PrivateScreenLayout>
            <AppSidebar onLogout={onLogout} />
            <Switch>
              {routes.map((route, i) => (
                <PrivateRoute
                  key={i}
                  exact
                  path={route.path}
                  component={route.component}
                  perm={route.perm}
                />
              ))}
            </Switch>
          </PrivateScreenLayout>
        </BaseLayout>
      </PermissionProvider>
    </MyInfoProvider>
  );
};
