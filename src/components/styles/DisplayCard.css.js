/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const blueThatHasNothingToDoWithTheThemeButLikesPM = '#009FDA';

export const displayCardUser = () => {
  const { currentTheme, mode } = useTheme();

  return css`
    background: #FFFFFF;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    font-size: 0.6rem;
    padding: 0.805vw;
    margin-right: 1.098vw;
    margin-bottom: 1rem;
    position: relative;
    width: 275px;

    #leftInfo {
      width: 162px;
      overflow-wrap: break-word;
    }
    #bottom {
      margin-top: 10px;
      display: flex;
    }
    #top {
      margin-top: 10px;
    }
    .greyText {
      color: #63513D;
      display: inline;
      opacity: 0.5;
    }
    .lastAcces {
      position: absolute;
      display: inline;
      color: #000000;
      right: 15px;
    }
    #nameLabel {
      text-align: left;
      font: normal normal normal 12px/18px Roboto;
      letter-spacing: 0px;
      color:  #63513D;
      opacity: 1;
    }
    #name {
      font: normal normal normal 12px/10px Roboto;
      letter-spacing: 0px;
      color: #000000;
      text-transform: capitalize;
      opacity: 1;
    }
    #sucursal {
      text-align: left;
      font: normal normal normal 12px/18px Roboto;
      letter-spacing: 0px;
      color: #000000;
      opacity: 1;
    }

    hr.new2 {
      margin-top: 1rem;
      border-top: 1px dashed #00000029;
    }
    #rightImages {
      margin-left: 35px;
      margin-right: -5px;
      #topImage {
        margin-top: -6px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
        }
      }
      #icons {
        position: absolute;
        display: flex;
        margin-top: 10px;
        margin-right: 5px;
        right: 5px;
        img {
          cursor: pointer;
          margin-left: 8px;
        }
      }
    }
  `;
};

export const displayCard = () => {
  const { currentTheme, mode } = useTheme();

  return css`
    background: ${currentTheme.background};
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 10px;
    font-size: 0.6rem;
    padding: 0.805vw;
    margin-right: 0.8vw;
    margin-top: 6px;
    display: flex;
    position: relative;

    #leftInfo {
      width: 150px;
      overflow-wrap: break-word;
    }

    a {
      text-decoration: none;
      color: ${currentTheme.texts};
    }
    .status-text {
      margin-top: 20px;
    }

    .greyText {
      color: ${currentTheme.texts};
      display: inline;
    }
    .activeColor {
      display: inline;
      color: ${mode !== 'dark'
        ? currentTheme.emphasis
        : blueThatHasNothingToDoWithTheThemeButLikesPM};
    }
    #id {
      margin-top: 8px;
      color: ${currentTheme.texts};
      font-size: 0.7rem;
    }
    #email {
      margin-top: 6px;
      color: ${currentTheme.texts};
      font-weight: 100px;
      padding-bottom: 5px;
      border-bottom: 1px dashed ${currentTheme.titles};
      margin-bottom: 8px;
    }
    #name {
      font-size: 0.7rem;
      color: ${mode !== 'dark'
        ? currentTheme.emphasis
        : blueThatHasNothingToDoWithTheThemeButLikesPM};
    }
    #rightImages {
      margin-left: 2rem;

      #topImage {
        width: 54px;
        height: 54px;
        background-color: ${mode == 'dark' ? 'white' : 'black'};
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 54px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 37px;
        }
      }
      #circles {
        display: flex;
        justify-content: flex-end;
        margin-top: 43px;
        cursor: pointer;
        .circle {
          margin: 2px;
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background-color: ${currentTheme.titles};
        }
      }
    }
    #accountOptions {
      position: absolute;
      bottom: -25px;
      left: 27%;
      width: auto;
      height: auto;
      background-color: ${currentTheme.button};
      color: ${currentTheme.button_Text};
      border-radius: 5px;
      z-index: 1000;

      ul {
        list-style-type: none;
        margin: 0px;
        padding: 0px;
      }
      li {
        padding: 7px;
        padding-top: 2px;
        padding-bottom: 10px;
        cursor: pointer;
        :hover {
          background-color: ${currentTheme.active_button};
          color: ${currentTheme.active_button_Text};
        }
      }

      a {
        background-color: ${currentTheme.button};
        color: ${currentTheme.button_Text};
        :hover {
          background-color: ${currentTheme.active_button};
          color: ${currentTheme.active_button_Text};
        }
      }
    }
  `;
};
