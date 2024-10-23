import { css } from '@emotion/react';

export const buttonStyle = css`
  letter-spacing: 0px;
  color: #ffffff;
  background: #000000;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 0.8rem 3rem;
  transition: all 0.3s;
  margin-top: 0.5rem;
  font: normal normal bold 12px/14px Roboto;
  color: #ffffff;
  text-transform: uppercase;
  opacity: 1;

  :active {
    transform: scale(0.8);
  }

  :hover {
    background: #007cba;
    color: #fff;
  }
`;

export const buttonInactiveStyle = css`
  font: normal normal bold 12px/14px Roboto;
  color: #ffffff;
  background: #000000;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 0.8rem 3rem;
  transition: all 0.3s;
  margin-top: 0.5rem;
`;


export const buttonRecoveryStyle = css`
  color: #ffffff;
  // background: #000000;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: all 0.3s;
  margin-top: 0.5rem;
  font: normal normal bold 12px/14px Roboto;
  color: #ffffff;
  opacity: 1;
  width: 100%;
  height: 40px;

  :active {
    transform: scale(0.8);
  }

  :hover {
    // background: #007cba;
    color: #fff;
  }
`;

export const buttonInactiveRecoveryStyle = css`
  font: normal normal bold 12px/14px Roboto;
  color: #ffffff;
  // background: #000000;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: all 0.3s;
  margin-top: 0.5rem;
  width: 100%;
  height: 40px;
`;

export const buttonRecoveryStyleNoWidth = css`
  color: #ffffff;
  // background: #000000;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: all 0.3s;
  margin-top: 0.5rem;
  font: normal normal bold 12px/14px Roboto;
  color: #ffffff;
  opacity: 1;
  width: 30%;
  height: 40px;

  :active {
    transform: scale(0.8);
  }

  :hover {
    // background: #007cba;
    color: #fff;
  }
`;

export const buttonInactiveRecoveryStyleNoWidth = css`
  font: normal normal bold 12px/14px Roboto;
  color: #ffffff;
  // background: #000000;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: all 0.3s;
  margin-top: 0.5rem;
  width: 30%;
  height: 40px;
`;