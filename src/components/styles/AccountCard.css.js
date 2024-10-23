/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const blueThatHasNothingToDoWithTheThemeButLikesPM = '#009FDA';

export const accountCardUser = () => {
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
    width: 305px;
    height: 200px;

    #leftInfo {
      width: 162px;
      overflow-wrap: break-word;
      margin-right: -20px;
    }
    #bottom {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      border-top: 3px dashed ${currentTheme.titles};
      border-bottom: 3px dashed ${currentTheme.titles};
      border-color: #5EC9FF;
      opacity: 1;
    }
    #top {
      margin-top: 10px;
    }
    .greyText {
      color: ${currentTheme.texts};
      display: inline;
      opacity: 0.5;
    }
    .rolUser {
      color: ${currentTheme.texts};
      display: inline;
      opacity: 0.5;
      text-align: left;
      font: normal normal normal 14px Roboto;
      letter-spacing: 0px;
      color: #63513D80;
      opacity: 1;
    }
    .lastAcces {
      position: absolute;
      display: inline;
      color: ${mode !== 'dark'
        ? currentTheme.emphasis
        : blueThatHasNothingToDoWithTheThemeButLikesPM};
      right: 15px;
      text-align: left;
      font: normal normal normal 14px Roboto;
      letter-spacing: 0px;
      color: #007CBA;
      opacity: 1
    }
    #name {
      width: 162px;
      height: 40px;
      text-align: left;
      font: normal normal normal 16px Roboto;
      letter-spacing: 0px;
      color: #007CBA;
      padding-top: 10px;
      text-transform: capitalize;
      opacity: 1;
      color: ${mode !== 'dark'
        ? currentTheme.emphasis
        : blueThatHasNothingToDoWithTheThemeButLikesPM};
      margin-top: 0px;
      width: 180px;
      border-top-color: #5EC9FF;
      text-align: left;
      font: normal normal normal 16px Roboto;
      letter-spacing: 0px;
      color: #007CBA;
      text-transform: capitalize;
      opacity: 1;
    }
    #email {
      text-align: left;
      font: normal normal normal 14px Roboto;
      letter-spacing: 0px;
      color: #63513D;
      opacity: 1;
      margin-top: 30px;
      color: ${currentTheme.texts};
      font-weight: 100px;
      padding-bottom: 10px;
      width: 190px;
      text-align: left;
      font: normal normal normal 14px Roboto;
      letter-spacing: 0px;
      color: #63513D;
      opacity: 1;
    }
    #rightImages {
      margin-left: 55px;
      margin-right: -5px;
      #topImage {
        margin-top: 10px;
        img {
          width: 70px;
          height: 70px;
          border-radius: 100%;
        }
      }
      #icons {
        position: absolute;
        margin-top: 10px;
        margin-right: 5px;
        right: 5px;
        img {
          cursor: pointer;
          margin-left: 8px;
        }
      }
      .bottoms {
        margin-top: 20px;
      }
    }
  `;
};

export const accountCard = () => {
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

    .greyText {
      color: ${currentTheme.texts};
      display: inline;
      opacity: 0.5;
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
