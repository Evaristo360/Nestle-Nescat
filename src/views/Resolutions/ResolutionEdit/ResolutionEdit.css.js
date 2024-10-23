import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

export const ResolutionEditStyle = () => {
  const { currentTheme } = useTheme();

  return css`
    width: 100%;
    overflow: visible;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 21px;
    flex-wrap: wrap;

    .content {
      width: 100%;
      padding-left: 24px;
      margin-top: 10px;
    }

    .button {
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

      :hover {
        background: ${currentTheme.active_button};
        color: ${currentTheme.active_button_Text};
      }
    }

    .subtitle {
      font: normal normal normal 16px/20px Verdana;
      color: ${currentTheme.texts};
      opacity: 0.5;
      width: 100%;
      height: 27px;
    }

    .form {
      display: inline-flex;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 33%;
    }

    .resolution {
      width: 100%;
      padding-top: 26px;
    }

    .width,
    .height {
      width: 81%;
      padding-top: 34px;
    }

    .status {
      width: 66%;
      padding-top: 44px;
    }

    .status-title {
      font: normal normal normal 12px/15px Verdana;
      letter-spacing: 0.6px;
      color: ${currentTheme.emphasis};
      margin-bottom: 15px;
    }

    .buttons-container {
      margin-top: 150px;
      display: flex;
      width: 100%;
      height: fit-content;
    }

    .edit {
      margin-right: 30px;
    }

    .deactive: hover {
      background: #000000;
      cursor: not-allowed;
      color: #ffffff;
    }
  `;
};
