/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react';
import userIcon from '../Images/newuser.svg';
import userIconActive from '../Images/newuserOn.svg';
import { useTheme } from 'hooks/useTheme';

export const buttonArea = () => css`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  cursor: pointer;
`;

export const button = () => {
  const { currentTheme } = useTheme();

  return css`
    margin-right: 5.71vw;
    display: flex;
    background: ${currentTheme.button} 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    padding: 9px 1.3vw 9px 0.586vw;
    p {
      font-weight: 100;
      font-size: 0.8rem;
      color: ${currentTheme.button_Text};
      padding-left: 0.5rem;
    }

    .client-icon {
      stroke: ${currentTheme.button_Text};
      fill: none;
    }

    :hover {
      p {
        color: ${currentTheme.active_button_Text};
      }
      background-color: ${currentTheme.active_button};
      .client-icon {
        stroke: ${currentTheme.active_button_Text};
      }
    }
  `;
};

export const buttonAreaUser = () => css`
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  margin-left: 43px;
  cursor: pointer;
  width: 150px;
`;

export const buttonUser = () => {
  const { currentTheme } = useTheme();

  return css`
    display: flex;
    background: #002169 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    padding: 9px 1.3vw 9px 0.586vw;
    width: 150px;

    .user-icon {
      stroke: ${currentTheme.button_Text};
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1px;
    }
    p {
      text-align: left;
      font-weight: 100;
      font-size: 0.8rem;
      color: ${currentTheme.button_Text};
      padding-left: 0.5rem;
      text-align: left;
      font: normal normal bold 12px/14px Roboto;
      letter-spacing: 0.01px;
      color: #FFFFFF;
      opacity: 1;
    }
    :hover {
      p {
        color: ${currentTheme.active_button_Text};
      }
      background-color: ${currentTheme.active_button};
      .user-icon {
        stroke: ${currentTheme.active_button_Text};
      }
    }
  `;
};
