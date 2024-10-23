import { css } from '@emotion/react';

export const inputStyle = css`
  .form-item--input {
    margin-top: 4%;
    background: #232323 0% 0% no-repeat padding-box;
    border-radius: 5%;
    border: none;
    outline: none;
    padding: 1rem 0;
    width: 100%;
    text-align: left;
    font: normal normal normal 12px/24px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    padding-right: 20px;
    // :not(:last-child) {
    //   margin-bottom: 2rem;
    // }
  }

  .form-item--input-label {
    position: absolute;
    padding: 20px;
    text-align: left;
    font: normal normal normal 13px/22px Roboto;
    letter-spacing: 0px;
    color: #ffffff80;
    opacity: 1;
    margin-left: -5px;
  }

  input::placeholder {
    color: red;
    text-align: left;
    font: normal normal normal 12px/24px Roboto;
    letter-spacing: 0px;
    // color: #ffffff33;
    opacity: 1;
    margin-top: 10px;
    padding: 15px;
  }
`;

export const inputStyle2 = css`
  .container-input {
    margin: auto;
    width: 80%;
    height: 80%;
    // border: 3px solid green;
    padding: 10px;
    border-radius: 4px 4px 0px 0px;
    // opacity: 0.05;
    margin-top: 0.5rem;
    background: #0b2a6f;
  }

  .form-item-input-label {
    color: #ffffff80;
    text-align: left;
    font: normal normal normal 13px/23px Roboto;
    letter-spacing: 0px;
    opacity: 1;
    margin-left: 1px;
    margin-top: -10px;
  }

  .form-item-input {
    background: transparent 0% 0% no-repeat padding-box;
    border: none;
    outline: none;
    width: 90%;
    text-align: left;
    font: normal normal normal 12px/24px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    margin-top: -10px;
  }

  input::placeholder {
    text-align: left;
    font: normal normal normal 12px/24px Roboto;
    letter-spacing: 0px;
    color: #ffffff33;
    opacity: 1;
    margin-top: -5px;
  }

  input:focus {
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 1px solid #63513d;
  }
`;

export const inputStyle3 = css`
  .container-input {
    margin: auto;
    width: 100%;
    height: 80%;
    // border: 3px solid green;
    padding: 10px;
    border-radius: 5%;
    margin-top: 0.5rem;
    background: transparent;
  }

  .form-item-input-label {
    color: #ffffff80;
    text-align: left;
    font: normal normal normal 13px/23px Roboto;
    letter-spacing: 0px;
    color: #ffffff80;
    opacity: 1;
    margin-left: 1px;
    margin-top: -10px;
  }

  .form-item-input {
    background: transparent 0% 0% no-repeat padding-box;
    border: none;
    outline: none;
    width: 90%;
    text-align: left;
    font: normal normal normal 12px/24px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    margin-top: -10px;
  }

  input::placeholder {
    text-align: left;
    font: normal normal normal 12px/24px Roboto;
    letter-spacing: 0px;
    color: #ffffff80;
    opacity: 1;
    margin-top: -5px;
  }

  input:focus {
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 1px solid #63513d;
  }
`;
