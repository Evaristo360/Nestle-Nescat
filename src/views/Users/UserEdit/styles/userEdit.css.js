import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

export const userEditStyle = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { currentTheme } = useTheme();

  return css`
    width: 100%;
    overflow: visible;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 21px;
    flex-wrap: wrap;
    box-sizing: border-box;

    .subtitle {
      font: normal normal normal 18px/20px Verdana;
      color: ${currentTheme.texts};
      opacity: 0.5;
      width: 100%;
      height: 27px;
      padding-left: 24px;
    }

    .content {
      width: 100%;
      padding-left: 24px;
      margin-top: 10px;
    }

    .form {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .cl-1 {
      width: 46.5%;
      display: inline-block;
    }

    .cl-2 {
      width: 53.5%;
      display: inline-block;
    }

    .name,
    .email,
    .phone {
      width: 70.2%;
      padding-top: 26px;
    }

    .logo {
      width: 70.2%;
      display: inline-block;
    }

    .logo .label {
      width: 100%;
      font: normal normal normal 12px/15px Verdana;
      letter-spacing: 0.6px;
      color: ${currentTheme.texts};
      height: 15px;
    }

    .logo .logo-content {
      display: flex;
    }

    .logo .img-container {
      width: 123px;
      height: 125px;
      border-radius: 8px;
    }

    .logo .info {
      display: flex;
      flex-wrap: wrap;
      padding-top: 7px;
      padding-left: 10px;
    }

    .logo .description {
      width: 100%;
      height: fit-content;
      font: normal normal normal 12px/15px Verdana;
      color: ${currentTheme.texts};
      opacity: 0.51;
    }

    .logo .button-container {
      width: 100%;
      height: fit-content;
    }

    .logo .button {
      padding: 13px 24px 12px 24px;
      border: none;
      background: ${currentTheme.button};
      box-shadow: 0px 3px 6px #00000029;
      border-radius: 5px;
      text-align: center;
      font: normal normal normal 14px/10px Verdana;
      color: ${currentTheme.button_Text};
    }

    .logo .button:hover {
      background: ${currentTheme.active_button};
      color: ${currentTheme.active_button_Text};
    }

    .logo .size {
      height: fit-content;
      font: normal normal normal 12px/15px Verdana;
      color: ${currentTheme.texts};
      opacity: 0.51;
    }

    .rol {
      width: 100%;
    }

    .rol .description {
      font: normal normal normal 12px/9px Verdana;
      color: ${currentTheme.texts};
    }

    .rol .value {
      margin-left: 15px;
      font: normal normal normal 14px/20px Verdana;
      color: ${currentTheme.texts};
      opacity: 0.5;
    }

    .perms {
      width: 100%;
      padding-top: 26px;
    }

    .perms {
      width: 100%;
      padding-top: 26px;
    }

    .send-container {
      display: flex;
      width: 100%;
      height: fit-content;
    }

    .send-button {
      margin-top: 63px;
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

    .send-button:hover {
      background: ${currentTheme.active_button};
      color: ${currentTheme.active_button_Text};
    }

    .deactive: hover {
      background: #000000;
      cursor: not-allowed;
      color: #ffffff;
    }
  `;
};
