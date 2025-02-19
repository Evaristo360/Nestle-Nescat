import React from 'react';
import { css, jsx } from '@emotion/react';

const AccountsIcon = ({ color }) => (
  <svg
    css={css`
      fill: none;
      stroke: ${color};
      margin-top: 2px;
    `}
    xmlns="http://www.w3.org/2000/svg"
    width="22.744"
    height="20.026"
    viewBox="0 0 22.744 20.026"
  >
    <path
      className="a"
      d="M0,0V8.154H8.154V0ZM10.872,0V2.718H21.744V0Zm0,5.436V8.154h8.154V5.436ZM0,10.872v8.154H8.154V10.872Zm10.872,0V13.59H21.744V10.872Zm0,5.436v2.718h8.154V16.308Z"
      transform="translate(0.5 0.5)"
    />
  </svg>
);

export default AccountsIcon;
