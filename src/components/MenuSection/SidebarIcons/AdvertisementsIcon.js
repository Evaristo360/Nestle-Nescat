import React from 'react';
import { css, jsx } from '@emotion/react';

const AdvertisementsIcon = ({ color }) => (
  <svg
    css={css`
      fill: none;
      stroke: ${color};
      stroke-linecap: round;
      stroke-linejoin: round;
      margin-top: 2px;
    `}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16.407 16.407"
  >
    <g transform="translate(-4 -4)">
      <path
        className="a"
        d="M6.189,4.5H18.011A1.689,1.689,0,0,1,19.7,6.189V18.011A1.689,1.689,0,0,1,18.011,19.7H6.189A1.689,1.689,0,0,1,4.5,18.011V6.189A1.689,1.689,0,0,1,6.189,4.5Z"
      />
      <path
        className="a"
        d="M13.033,11.767A1.267,1.267,0,1,1,11.767,10.5,1.267,1.267,0,0,1,13.033,11.767Z"
        transform="translate(-2.622 -2.622)"
      />
      <path
        className="a"
        d="M21.011,19.222,16.789,15,7.5,24.289"
        transform="translate(-1.311 -4.589)"
      />
    </g>
  </svg>
);

export default AdvertisementsIcon;
