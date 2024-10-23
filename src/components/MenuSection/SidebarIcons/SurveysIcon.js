import React from 'react';
import { css, jsx } from '@emotion/react';

const SurveysIcon = ({ color }) => (
  <svg
    css={css`
      fill: none;
      stroke: ${color};
      stroke-linecap: round;
      stroke-linejoin: round;
      margin-top: 7px;
    `}
    xmlns="http://www.w3.org/2000/svg"
    width="13.765"
    height="9.51"
    viewBox="0 0 13.765 9.51"
  >
    <g transform="translate(-4 -8.5)">
      <path className="a" d="M12,9h9.219" transform="translate(-3.954)" />
      <path
        className="a"
        d="M12,18h9.219"
        transform="translate(-3.954 -4.745)"
      />
      <path
        className="a"
        d="M12,27h9.219"
        transform="translate(-3.954 -9.49)"
      />
      <path className="a" d="M4.5,9h0" />
      <path className="a" d="M4.5,18h0" transform="translate(0 -4.745)" />
      <path className="a" d="M4.5,27h0" transform="translate(0 -9.49)" />
    </g>
  </svg>
);

export default SurveysIcon;
