import React, { useEffect } from 'react';
import { welcomeMessageStyle } from '../styles';
import useTimeout from '../hooks/useTimeout';
import nestleLogo from 'assets/recompensas-nestle-logo.svg';

function WelcomeMessage({ onCompleteAnimation }) {
  const [completeAnimationTimeout, , stopTimeout] = useTimeout(
    onCompleteAnimation,
    1200
  );

  useEffect(() => {
    completeAnimationTimeout();

    return () => stopTimeout();
  });

  return (
    <div css={welcomeMessageStyle}>
      <div className="center">
        <img className="img-nestle" src={nestleLogo} alt="nestle logo" />
        <br/>
        <h3 className="welcome-text">Plataforma de gestión</h3>
      </div>
      {/* <div className="welcome-message--text"></div>
      <img className="welcome-message--robot" src={botImg} alt="message" /> */}
      {/* <img  src={messageImg} alt="robot" />

      */}
    </div>
  );
}

export default WelcomeMessage;
