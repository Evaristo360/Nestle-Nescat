import { css } from '@emotion/react';

export const signInForm = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .signin-form--title {
    font: normal normal bold 25px/30px Verdana;
    letter-spacing: 0px;
    color: #2aa4d5;
    padding: 10px 150px 10px 100px;
    height: 30%;
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .signin-form--help {
    margin-top: -4rem;
    font: normal normal normal 16px/21px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
    padding: 10px 150px 10px 100px;
    height: 30%;
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: center;
  }

  .signin-form--form {
    padding: 10px 60px 0px 20px;
    // display: inline-flex;
    // flex-direction: column;
    height: 80%;
    box-sising: border-box;
    justify-content: flex-end;
  }

  .signin-form--btn-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 38px 20px 38px;

    .btn-group--change-password {
      text-align: center;
      font: normal normal medium 14px/19px Roboto;
      letter-spacing: 0px;
      color: #ffffff1a;
      opacity: 1;
      margin-top: 2rem;
      cursor: pointer;
    }
  }

  
`;
