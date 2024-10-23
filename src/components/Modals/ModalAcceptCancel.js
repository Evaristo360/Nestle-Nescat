import React from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import { messages } from './messages';
import Dialog from '../Dialog';
import { useIntl } from 'react-intl';

const ModalAcceptCancel = ({
  title = '',
  message = '',
  onAccept,
  visible,
  onCancel
}) => {
  const intl = useIntl();
  const { currentTheme } = useTheme();
  const component = visible ? (
    <Dialog>
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
          position: relative;

          .modal--close-icon {
            position: absolute;
            top: 0;
            right: 0;
            margin: 2rem;
            cursor: pointer;
            fill: ${currentTheme.texts};
            opacity: 0.5;
          }

          .alert-text {
            font: normal normal normal 16px/19px Verdana;
            color: ${currentTheme.texts};
          }

          .buttons-container {
            margin-top: 58px;
          }

          .button {
            margin: 5px;
            display: inline-block;
            padding: 13px 18px 12px 18px;
            width: auto;
            min-width: 152px;
            border: none;
            background: ${currentTheme.button};
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 5px;
            text-align: center;
            font: normal normal normal 14px/10px Verdana;
            color: ${currentTheme.button_Text};
          }

          .button:hover {
            background: ${currentTheme.active_button};
            color: ${currentTheme.active_button_Text};
          }
          .text h6 {
            color: ${currentTheme.titles};
            font-family: Verdana;
            font-weight: bold;
            font-size: 16px;
            line-spacing: 19px;
            letter-spacing: 0;
          }
          .text {
            margin-top: 0.5rem;
          }
          .text p {
            text-align: left;
            font-size: 16px;
            font-family: Verdana;
            letter-spacing: 0px;
            color: ${currentTheme.texts};
            opacity: 0.5;
          }
        `}
      >
        <svg
          className="modal--close-icon"
          onClick={onCancel}
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
        <h1 className="text">{title}</h1>
        <p className="text">{message}</p>
        <div className="buttons-container">
          <button onClick={onAccept} className="button">
            {intl.formatMessage(messages.accept)}
          </button>
          <button onClick={onCancel} className="button">
            {intl.formatMessage(messages.cancel)}
          </button>
        </div>
      </div>
    </Dialog>
  ) : null;

  return component;
};

export default ModalAcceptCancel;
