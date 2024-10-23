import { css } from '@emotion/react';

export const corporateEmail = css`
  display: flex;
  flex-direction: column;

  .corporate-email--title {
    font: normal normal bold 16px/19px Roboto;
    letter-spacing: 0px;
    color: #63513d;
  }

  .corporate-email--description {
    font: normal normal normal 16px/19px Roboto;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 2rem;
  }

  .corporate-email--form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
  }
`;

export const corporateEmailRecovery = css`
  display: flex;
  flex-direction: column;

  .modal-content {
    margin: auto;
    width: 500px;
    height: 600px;
    padding: 10px;
    background: transparent linear-gradient(142deg, #f2c043 0%, #f2b243 100%) 0%
      0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
    border-radius: 20px;
  }

  .mt-4 {
    margin-top: 4rem;
  }

  .mlf-1 {
    margin-right: -1rem;
  }

  img {
    margin-top: -2rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  .corporate-email-title {
    margin-top: -2rem;
    color: #63513d;
    text-align: center;
    font: normal normal normal 25px/33px Roboto;
    letter-spacing: 0px;
    color: #63513d;
    opacity: 1;
  }

  .corporate-email-description {
    margin-top: 0.5rem;
    text-align: center;
    font: normal normal normal 15px/17px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }

  .corporate-email--form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
  }
`;

export const pinValidation = css`
  display: flex;
  flex-direction: column;

  .modal-content {
    margin: auto;
    width: 70%;
    padding: 10px;
    background: transparent linear-gradient(142deg, #f2c043 0%, #f2b243 100%) 0%
      0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
    border-radius: 20px;
  }

  .mt-4 {
    margin-top: 4rem;
  }

  .mlf-1 {
    margin-right: -1rem;
  }

  img {
    margin-top: -2rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  .corporate-email--title {
    display: flex;
    justify-content: center;
    font: normal normal bold 16px/19px Roboto;
    letter-spacing: 0px;
    color: #63513d;
  }

  .corporate-email--description {
    display: flex;
    justify-content: center;
    font: normal normal normal 16px/19px Roboto;
    color: #ffffff;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    text-align: center;
  }

  .corporate-email--form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .pin-error--btn-group {
    width: 25rem;
    display: flex;
    justify-content: space-between;
  }

  .button {
    display: flex;
    justify-content: center;
  }
  .input {
    margin-left: 1rem;
  }
`;

export const pinError = css`
  display: flex;
  flex-direction: column;

  .modal-content {
    margin-right: 2rem;
    margin-left: 2rem;
    width: 100%;
    padding: 10px;
    background: transparent linear-gradient(142deg, #f2c043 0%, #f2b243 100%) 0%
      0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
    border-radius: 20px;
  }

  .mt-4 {
    margin-top: 4rem;
  }

  .mlf-1 {
    margin-right: -1rem;
  }

  img {
    margin-top: -2rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  .corporate-email--title {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    margin-top: 2rem;
    font: normal normal bold 16px/19px Roboto;
    letter-spacing: 0px;
    color: #63513d;
  }

  .corporate-email--description {
    font: normal normal normal 16px/19px Roboto;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }

  .corporate-email--form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .pin-error--btn-group {
    width: 25rem;
    display: flex;
    justify-content: space-between;
  }
  .button {
    width: 18rem;
    display: flex;
    justify-content: space-between;
  }
`;

export const pinSuccess = css`
  display: flex;
  flex-direction: column;

  .modal-content {
    margin-right: 2rem;
    margin-left: 2rem;
    width: 100%;
    padding: 10px;
    background: transparent linear-gradient(142deg, #f2c043 0%, #f2b243 100%) 0%
      0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
    border-radius: 20px;
  }

  .mt-4 {
    margin-top: 4rem;
  }

  .mlf-1 {
    margin-right: -1rem;
  }

  img {
    margin-top: -2rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  .corporate-email--title {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    margin-top: 2rem;
    font: normal normal bold 16px/19px Roboto;
    letter-spacing: 0px;
    color: #63513d;
  }

  .corporate-email--description {
    margin-bottom: 2rem;
    margin-top: 2rem;
    font: normal normal normal 16px/19px Roboto;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }

  .corporate-email--form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .pin-error--btn-group {
    width: 25rem;
    display: flex;
    justify-content: space-between;
  }

  .button {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
`;
