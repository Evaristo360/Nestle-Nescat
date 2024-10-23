import React, { Suspense } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import SuspensePage from 'components/SuspensePage';
import useLocalStorage from 'hooks/useLocalStorage';
import { MyInfoProvider } from 'providers/myInfoProvider';

export const Navigation = withRouter(({ history }) => {
  const { getItem } = useLocalStorage();

  function isLoggedIn() {
    const token = getItem('token');

    return token !== null;
  }

  function renderRoutes() {
    if (isLoggedIn()) {
      return <PrivateRoutes history={history} />;
    } else {
      return <PublicRoutes />;
    }
  }

  return (
    <Suspense fallback={<SuspensePage />}>
      <Switch>
        {/*<Route exact path="/answerSurvey/:id" component={AnswerSurvey} />*/}
        {renderRoutes()}
      </Switch>
    </Suspense>
  );
});
