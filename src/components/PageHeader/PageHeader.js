import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useTheme } from 'hooks/useTheme';

const PageHeader = ({ title, to }) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        box-sizing: border-box;
        height: 113px;
        padding: 65px 34px 10px 24px;
        width: 100%;
        font: normal normal bold 25px/30px Verdana;
        color: ${currentTheme.titles};

        .back-icon {
          margin-right: 10px;
          fill: ${currentTheme.texts};
          opacity: 0.5;
        }

        .back-icon:hover {
          fill: #c9dd03;
          opacity: 1;
        }
        .link-back {
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
      `}
    >
      {to ? (
        <Link to={to} className="link-back">
          <svg
            className="back-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              d="M30,16.5H11.745L20.13,8.115,18,6,6,18,18,30l2.115-2.115L11.745,19.5H30Z"
              transform="translate(-6 -6)"
            />
          </svg>
        </Link>
      ) : null}
      {title}
    </div>
  );
};

export default PageHeader;
