import React from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

import Dialog2 from '../Dialog2';

const PageModal = ({ children, visible, onClose }) => {
  const { currentTheme } = useTheme();
  const component = visible ? (
    <Dialog2>
      <div
        css={css`
          width: 100%;
          height: 100vh;
          background: ${currentTheme.background};
          color: ${currentTheme.texts};
          z-index: 300;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .modal--close-icon {
            position: absolute;
            top: 0;
            right: 0;
            margin: 2rem;
            cursor: pointer;
            fill: ${currentTheme.texts};
            opacity: 0.5;
          }

          .page-container {
            display: flex;
            height: 100vh;
            width: 100%;
            overflow-y: auto;
            position: relative;
          }

          .offset {
            width: 307px;
            height: 100%;
          }
        `}
      >
        <div className="page-container">
          <svg
            className="modal--close-icon"
            onClick={onClose}
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
          <div className="offset"></div>
          {children}
        </div>
      </div>
    </Dialog2>
  ) : null;

  return component;
};

export default PageModal;
