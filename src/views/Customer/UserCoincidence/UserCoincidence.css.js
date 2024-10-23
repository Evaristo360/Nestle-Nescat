import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

export const UserCoincidenceCreateStyle = () => {
  const { currentTheme, mode } = useTheme();

  return css`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow-y: auto;
    background: ${currentTheme.background};
    .title {
      display: flex;
      justify-content: center;
      font: normal normal bold 26px Roboto;
      letter-spacing: 0px;
      color: ${mode !== 'dark'
      ? '#002169'
      : '#FFFFFF'};
      opacity: 1;
    }
    .header {
      color: #007cba0d;
      background: #007cba0d;
      padding: 1rem 2.5rem;
    }
    .subtitle {
      font: normal normal normal 18px/20px Verdana;
      color: ${currentTheme.texts};
      opacity: 0.5;
      width: 100%;
      height: 27px;
    }

    .content {
      margin: 20px;
      height: calc(100%-43px);
    }

    .button-accept-container {
      display: flex;
      justify-content: center;
    }

    .button-download-container {
      display: flex;
      justify-content: flex-end;
    }

    .accept-button {
      text-align: left;
      font: normal normal bold 14px Roboto;
      letter-spacing: 0.01px;
      color: #FFFFFF;
      background: #002169 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 3px #0000001A;
      border-radius: 4px;
      opacity: 1;
    }

    .download-button {
      text-align: left;
      font: normal normal bold 14px Roboto;
      letter-spacing: 0.01px;
      color: #FFFFFF;
      margin-top: 0.5rem;
      background: #007CBA 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 3px #0000001A;
      border-radius: 4px;
      opacity: 1;
    }

    .download-button:hover {
      background: #007CBA;
      opacity: 0.90;
    }

    .accept-button:hover {
      background: #002169;
      opacity: 0.90;
    }

    .form {
      margin: 12px;
      line-height: 30px;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .emphasis {
      color: ${currentTheme.emphasis};
    }

    .table {
      margin-top: 13px;
      border: none;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 1px 2px #0000001A;
      border-radius: 4px;
      opacity: 1;
      thead {
        background: #007cba0a;
        color: #63513d;
        height: 35px;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
      tbody {
        tr {
          font: normal normal normal 12px/15px Roboto;
          color: #1c1c1c;
          border-bottom: transparent;
        }
      }

      th,
      td {
        height: 35px;
        border-top: none;
        border-bottom: none;
        text-align: center;
        padding: 15px 3px 15px 3px;
        vertical-align: middle;
      }

      th {
        font: normal normal normal 12px/16px Roboto;
        font-weight: bolder;
        letter-spacing: 0px;
        color: #4E4E4E;
        padding-top: 1rem;
        padding-bottom: 1rem;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #D6D6D633;
        border-radius: 5px;
        opacity: 1;
        font: normal normal medium 14px/19px Roboto;
        letter-spacing: 0px;
        color: #63513D80;
        opacity: 1;
        border-top: none;
        border-bottom: none;
      }
    }
  `;
};
