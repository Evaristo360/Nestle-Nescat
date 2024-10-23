import { func } from 'prop-types';
import React from 'react';
import { buttonStyle, buttonInactiveStyle } from '../styles';

function SignInButton({ children, active = true, ...props }) {
  return (
    <button
      css={active ? buttonStyle : buttonInactiveStyle}
      {...props}
      style={{ cursor: active ? 'pointer' : 'not-allowed' }}
    >
      {children}
    </button>
  );
}

export default SignInButton;
