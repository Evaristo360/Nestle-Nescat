/* eslint-disable no-unreachable */
import React from 'react';
import nestleLogo from 'assets/recompensas-nestle-logo.svg';
import { headerStyle } from '../styles';

function SignInHeader() {
  return (
    <div style={{ marginTop: '6%' }} className="container">
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <img
            className="signin-header--nestle"
            style={{ width: '80%', marginLeft: '-20px' }}
            src={nestleLogo}
            alt="title"
          />
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );

  return (
    <div css={headerStyle}>
      {/* <img src={octopyLogo} alt="octopy" /> */}
      <img className="signin-header--nestle" src={nestleLogo} alt="title" />

      {/* <img className="signin-header--name" src={titleImg} alt="title" /> */}
    </div>
  );
}

export default SignInHeader;
