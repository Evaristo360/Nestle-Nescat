import React, { useState } from 'react';
import { signInPageStyle } from './styles';

import UserSignIn from './components/UserSignIn';
import WelcomeMessage from './components/WelcomeMessage';

export const SignInPage = ({ history }) => {
  const [currentView, changeView] = useState('WelcomeMessage');
  const { replace } = history;

  function getView() {
    switch (currentView) {
      case 'WelcomeMessage':
        return (
          <WelcomeMessage onCompleteAnimation={() => changeView('SignIn')} />
        );
      case 'SignIn':
        return <UserSignIn onRedirect={() => replace('/nestle/analytics')} />;
      default:
        return (
          <WelcomeMessage onCompleteAnimation={() => changeView('SignIn')} />
        );
    }
  }

  return <section css={signInPageStyle}>{getView()}</section>;
};
