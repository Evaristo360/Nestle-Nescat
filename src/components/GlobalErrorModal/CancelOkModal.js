import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

export const GlobalErrorModal = ({
  title = 'Error',
  text = 'Ha ocurrido un error, intente de nuevo más tarde',
  okLabel = 'Aceptar'
}) => {
  const { currentTheme } = useTheme();
  const [visible, setVisible] = useState(true);

  const onAccept = () => {
    setVisible(false);
  };

  const styles = css`
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: ${visible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    background: #0e0e0e66 0% 0% no-repeat padding-box;
    .dialog {
      padding: 2rem;
    }
    .title h6 {
      color: #dcdcdc;
      text-align: left;
      font: normal normal normal 12px/16px Roboto;
      letter-spacing: 0px;
      opacity: 1;
    }
    .text {
      margin-top: 0.5rem;
    }
    .text p {
      text-align: left;
      font: normal normal normal 12px/16px Roboto;
      letter-spacing: 0px;
      color: #dcdcdc;
      // text-align: left;
      // font-size: 16px;
      // font-family: Verdana;
      // letter-spacing: 0px;
      // color: ${currentTheme.texts};
      // opacity: 0.5;
    }
    .flex-start {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 1rem;
    }
    button {
      // background: ${currentTheme.button};
      // color: ${currentTheme.button_Text};
      border: none;
      padding: 0.4rem 2rem;
      border-radius: 6px;
      font-size: 12px;
      text-align: left;
      font: normal normal bold 12px/14px Roboto;
      letter-spacing: 0.01px;
      color: #000000;
      &:focus {
        outline: none;
      }
      &:hover {
        cursor: pointer;
        background: ${currentTheme.active_button};
        color: ${currentTheme.active_button_Text};
      }
    }

    .container-modal-sw {
      margin-top: 4rem;
      position: absolute;
      // margin: auto;
      top: 0px;
      width: 35%;
      // border: 3px solid green;
      padding: 10px;
      background: #212529 0% 0% no-repeat padding-box;
      border-radius: 8px;
      opacity: 1;
    }
  `;

  return (
    <div className="animate backInRight animate__backInRight" css={styles}>
      <div className="container-modal-sw">
        <div className="dialog">
          <div className="title">
            <h6>{title}</h6>
          </div>
          <div className="text">
            <p> {text} </p>
          </div>
          <br />
          <div className="flex-start">
            <button
              style={{ background: '#20B5D3', color: '#000' }}
              onClick={onAccept}
            >
              {okLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
