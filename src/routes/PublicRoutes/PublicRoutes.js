import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { SignInPage } from 'views/SignInPage';
import { Terms } from 'views/Terms';

//const SignInPage = lazy('../../views/SignInPage');

//const AnswerSurvey = lazy(() => import('./AnswerSurvey'));

export const PublicRoutes = (history) => (
  
    history.location.pathname === "/terms"
    ?
      <Route exact path="/terms" component={Terms} />
    :
      <Switch>
        <Route exact path="/" component={SignInPage} />
        <Redirect to="/"/>
      </Switch>
);
