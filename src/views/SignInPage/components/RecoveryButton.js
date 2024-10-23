import { func } from 'prop-types';
import React from 'react';
import {
  buttonInactiveRecoveryStyle,
  buttonRecoveryStyle,
  buttonRecoveryStyleNoWidth,
  buttonInactiveRecoveryStyleNoWidth
} from '../styles/signInButton.css';

function RecoveryButton({ children, active = true, fullWidth=true, dark = false, ...props }) {
  return (
    <button
      css={fullWidth 
        ? (active ? buttonRecoveryStyle : buttonInactiveRecoveryStyle) 
        : (active ? buttonRecoveryStyleNoWidth : buttonInactiveRecoveryStyleNoWidth)}
      {...props}
      style={{
        cursor: active ? 'pointer' : 'not-allowed',
        background: dark ? '#000000' : '#007cba'
      }}
    >
      {children}
    </button>
  );
}

export default RecoveryButton;
