import React from 'react';
import { css, jsx } from '@emotion/react';

const CrossIcon = ({ color }) => (
  <svg
    css={css`
      fill: #ff0000;
    `}
    xmlns="http://www.w3.org/2000/svg"
    width="10.85"
    height="10.25"
    viewBox="0 0 10.85 10.25"
  >
    <path
      className="a"
      d="M18.35,8.532,17.257,7.5l-4.332,4.093L8.593,7.5,7.5,8.532l4.332,4.093L7.5,16.718,8.593,17.75l4.332-4.093,4.332,4.093,1.093-1.032-4.332-4.093Z"
      transform="translate(-7.5 -7.5)"
    />
  </svg>
);

export default CrossIcon;
