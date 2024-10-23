import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import hexToRGB from 'components/utils/hexToRBG';

export const Styles = () => {
  const { currentTheme } = useTheme();

  return css`
    width: 100%;
    height: 80vh;
    padding-top: 0px;    
    color: ${currentTheme.texts};
    font-size: 12px;
    h1 {
      font: normal normal bold 25px/30px Verdana;
      font-size: 25px;
      color: ${currentTheme.texts}!important;
    }
    p {
      display: inline;
    }
    .buttonClass {
      background-color: ${currentTheme.button};
      color: ${currentTheme.button_Text};
      border: 0px;
      padding: 9px 15px 9px 15px;
      height: 37px;
      bottom: 0px;
      border-radius: 5px;
      text-decoration: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      :hover {
        background-color: ${currentTheme.active_button};
        color: ${currentTheme.active_button_Text};
      }
    }

    #headSection {
      display: flex;
      margin-top: 21px;
      margin-right: 61px;
      justify-content: space-between;
      #leftTop {
        display: flex;
        #filterText {
          margin-top: 6px;
          color: #82786f;
          font: normal normal normal 14px/20px Verdana;
          text-align: left;
          font: normal normal bold 18px/24px Roboto;
          letter-spacing: 0px;
          color: #63513D80;
          opacity: 1;
        }
        #dateText {
          margin-top: 5px;
          color: ${hexToRGB(currentTheme.texts, 0.5)};
          margin-left: 32px;
          font: normal normal normal 12px/15px Verdana;
          text-align: left;
          font: normal normal bold 15px/24px Roboto;
          letter-spacing: 0px;
          color: #63513D80;
          opacity: 1;
        }
      }
      #rightTop {
        display: flex;
        align-items: center;
        margin-top: 5px;

        #status {
          position: relative;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently*/
          cursor: pointer;
          .statusHeader {
            box-shadow: 0px 5px 3px #00000026;
            border-radius: 5px;
            padding: 8px 13px 8px 13px;
            color: #82786f;
            img {
              margin-left: 15px;
            }
          }
          #statusOptions {
            position: absolute;
            width: 100px;
            box-shadow: 0px 5px 3px #00000026;
            border-radius: 5px;
            background-color: ${currentTheme.button};
            .statusElement {
              padding: 10px 13px 10px 13px;
              background-color: ${currentTheme.button};
              width: 100%;
              transition: 0.5s;
              border-radius: 5px 5px 0px 0px;
              color: ${currentTheme.button_Text};
              :hover {
                background-color: ${currentTheme.button};
                width: 120%;
              }
            }
          }
        }
        #restoreButton {
          margin-left: 26px;
          background: #002169 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 3px #0000001A;
          border-radius: 4px;
          opacity: 1;
          :hover{
          background: #20B5D3; 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 3px #0000001A;
          border-radius: 4px;
          opacity: 1;
          }
        }
      }
    }
    h3 {
      margin-top: 10rem;
      text-align: left;
      font: normal normal normal 21px Roboto;
      letter-spacing: 0px;
      color: #63513D;
      opacity: 1;
    }
    #showPerPage {
      display: flex;
      margin-top: 23px;
      color: #82786f;
      font-size: 12px;
      font: normal normal normal 12px/15px Verdana;
      img {
        margin-left: 10px;
      }
      #status {
        margin-right: 12px;
        margin-left: 12px;
        cursor: pointer;
        position: relative;
      }
      #elementsChoice {
        position: absolute;
        background-color: ${currentTheme.background};
        cursor: pointer;
        box-shadow: 0px 5px 3px #00000026;
        border-radius: 5px;
        #element {
          width: 20px;
          padding: 5px;
          color: ${currentTheme.texts};
          transition: 0.4s;
          :hover {
            background-color: black;
            color: ${currentTheme.button_Text};
          }
        }
        #element:last-child {
          border-radius: 0px 0px 5px 5px;
        }
      }
    }
    #graphs {
      display: flex;
      width: 100hv;
    }
    #listSection {
      margin-top: 1rem;
      .downloadIcon {
        cursor: pointer;
      }
      #surveysDisplay {
        width: 95%;
        .iniHead {
          padding-left: 16px;
        }
        th {
          text-align: left;
          font: normal normal normal 12px/15px Verdana;
          letter-spacing: 0px;
          color: ${currentTheme.emphasis};
          text-transform: uppercase;
          padding-right: 5px;
          padding-bottom: 5px;
          img {
            margin-right: 5px;
            cursor: pointer;
          }
        }
        .headline {
          border-bottom: 1px solid ${currentTheme.emphasis};
        }
        .inside {
          background-color: transparent;
        }
        .inside:nth-of-type(even) {
          background-color: ${hexToRGB(currentTheme.texts, 0.05)};
        }
        td {
          position: relative;
          padding: 8px 8px 8px 0px;
          color: ${hexToRGB(currentTheme.texts, 0.5)};
          opacity: 0.8;
        }
        td:nth-of-type(1) {
          width: 191px;
        }
        td:nth-of-type(2) {
          width: 250px;
        }
        td:nth-of-type(3) {
          width: 315px;
        }
        #circles {
          cursor: pointer;
          padding-right: 8px;
          .circle {
            margin: 2px;
            width: 6px;
            height: 6px;
            border-radius: 6px;
            background-color: #00ffee;
          }
        }
      }
    }
    #bottomSection {
      display: flex;
      margin-right: 50px;
      justify-content: space-between;
      margin-top: 25px;
      color: ${hexToRGB(currentTheme.texts, 0.2)};
      #pagination {
        margin-bottom: 10px;
        display: flex;
        position: relative;
        #paginationNum {
          background-color: #000000;
          padding: 6px 6px 4px 6px;
          color: #ffffff;
          margin-left: 10px;
          margin-right: 10px;
          font: normal normal normal 9px/15px Sarabun;
        }
        #leftArrow {
          position: absolute;
          transform: rotate(180deg);
          top: 0px;
          left: -25px;
          cursor: pointer;
          transition: 0.3s;
          :hover {
            background-color: #222222;
          }
        }
        #rightArrow {
          cursor: pointer;
          margin-left: -3px;
          margin-top: 1px;
          transition: 0.3s;
          :hover {
            background-color: #222222;
          }
        }
      }
    }
    table: {
      margin-top: 80rem;
      text-align: left;
      font: normal normal normal 21px Roboto;
      letter-spacing: 0px;
      color: #63513D;
      opacity: 1;
    }
    center: {
      display: flex;
      flex-direction: column;
    }
  `;
};
