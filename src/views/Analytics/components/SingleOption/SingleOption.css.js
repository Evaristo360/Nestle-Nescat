import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import hexToRGB from 'components/utils/hexToRBG';

export const Styles = () => {
  const { currentTheme } = useTheme();

  return css`
    width: 100%;
    margin-top: 39px;
    position: relative;

    margin-bottom: 100px;
    #textID {
      font-size: 0.5rem;
      font-weight: bold;
    }
    #chartContent {
      color: #c7c2ba;
      margin-bottom: 20px;
      width: 460px;

      h1 {
        text-align: left;
        font: normal normal medium 21px Roboto;
        letter-spacing: 0px;
        color: #63513D;
        opacity: 1;
      }
      #subtitle {
        width: 120px;
        text-align: center;
        h2 {
          margin-top: 28px;
          color: ${hexToRGB(currentTheme.texts, 0.75)};
          font: normal normal normal 14px/16px Verdana;
          margin-bottom: 10px;
        }
        b {
          font: normal normal bold 16px/11px Verdana;
          color: ${currentTheme.texts};
        }
      }
    }

    #optionsColors {
      color: ${currentTheme.texts};
      font-size: 0.5rem;
      margin-left: -30px;
      li {
        display: flex;
        align-items: center;
      }
      #colorCircle {
        width: 12px;
        height: 12px;
        border-radius: 12px;
        margin-right: 5px;
      }
    }
    #pieImage {
      display: flex;
      position: absolute;
      top: 60px;
      left: 50px;
    }
  `;
};
