import React from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import CalendarDialog from 'components/Calendar Dialog/CalendarDialog';

export const EventCreateModalSimpleAccept = ({ children, visible, onClose }) => {
  const { currentTheme } = useTheme();
  const component = visible ? (
    <CalendarDialog>
      <div
        css={css`
          top: 8rem;
          left: 18rem;
          background: #212529;
          border-radius: 8px;
          color: ${currentTheme.texts};
          z-index: 500;
          display: flex;
          flex-direction: column;
          position: relative;

          .modal--close-icon {
            position: absolute;
            top: 100px;
            right: 100px;
            margin: 2rem;
            cursor: pointer;
            fill: ${currentTheme.texts};
            opacity: 0.5;
          }

          .alert-text {
            margin-top: 20px;
            padding-left: 20px;
            padding-right: 20px;
            text-align: left;
            font: normal normal normal 16px Roboto;
            letter-spacing: 0px;
            color: #DCDCDC;
            opacity: 1;
          }

          .alert-cancel-button {
            margin-top: 63px;
            margin-left: 17rem;
            margin-right: 3rem;
            margin-bottom: 2rem;
            padding: 13px 18px 12px 18px;
            width: 74px;
            min-width: 152px;
            border: none;
            text-align: center;
            font: normal normal normal 14px/10px Verdana;
            color: ${currentTheme.button_Text};
            background: #20B5D3 0% 0% no-repeat padding-box;
            box-shadow: 0px 3px 3px #0000001A;
            border-radius: 4px;
            opacity: 1;
          }

          .alert-cancel-button:hover {
            background: ${currentTheme.active_button};
            color: ${currentTheme.active_button_Text};
          }
        `}
      >
        <svg
          className="modal--close-icon"
          onClick={onClose}
          xmlns="http://www.w3.org/2000/svg"
          width="10.85"
          height="10.25"
          viewBox="0 0 10.85 10.25"
        >
        </svg>
        {children}
      </div>
    </CalendarDialog>
  ) : null;

  return component;
};
