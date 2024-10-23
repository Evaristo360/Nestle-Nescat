import { css } from '@emotion/react';
import containerStyles from 'components/styles/containers.css';
import themeStyles from 'components/styles/theme.css';
import hexToRGB from 'components/utils/hexToRBG';
import { useTheme } from 'hooks/useTheme';

const SceneDesignStyles = ({ sceneBackground, isLoading }) => {
  const { mode, currentTheme } = useTheme();

  const colorToolBox = mode == 'dark' ? currentTheme.button : 'white';

  return css`
    ${containerStyles()}
    ${themeStyles({ currentTheme })}
    padding-left: 0!important;
    padding-right: 0 !important;
    overflow-x: hidden;
    overflow-y: scroll;

    .main-row {
      margin-top: -2rem !important;
    }

    button:not(.btn-novo):not(.btn-toggle):not(.close):not(.option) {
      &.light {
        opacity: 0.5;
      }
      &.control {
        margin-left: 0.7rem;
      }
      padding: 0.25rem;
      border: none;
      background: transparent;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
    .btn-emphasis {
      color: ${currentTheme.emphasis};
    }
    .btn-light {
      color: ${currentTheme.texts};
      opacity: 0.5;
    }
    .select-cont {
      width: 55%;
    }
    .clock {
      width: 45%;
    }
    .d-none {
      display: none;
    }
    .circle {
      margin-top: 2px;
      margin-bottom: 2px;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background-color: #fff;
    }
    .btn-toggle {
      width: 15px;
      height: 46px;
      position: absolute;
      top: 5%;
      right: 0;
      // background: #212529;
      border: none;
      background: #212529 0% 0% no-repeat padding-box;
      border-radius: 3px 0px 0px 3px;
    }
    .tool-box {
      background: #ffffff 0% 0% no-repeat padding-box;
      width: 100%;
    }
    .select-dark {
      margin-top: 0.75rem;
      margin-bottom: 0.75rem;
      .placeholder {
        background: ${colorToolBox};
        padding: 1rem;
        padding-left: 0;
        font-size: 16px;
        opacity: 0.5;
        font-weight: bold;
      }
      .options {
        .option {
          font-size: 16px;
          font-weight: bold;
          padding-left: 1rem;
        }
      }
    }
    ol,
    ul {
      list-style: none;
      padding-left: 0px;
    }
    .region {
      position: relative;
      cursor: pointer;
      width: 0;
      height: 0;
      background: ${sceneBackground};
      border: 1px solid ${currentTheme.emphasis};
      .region-corner {
        position: absolute;
        bottom: -5px;
        right: -5px;
      }
      .close {
        border: none;
        opacity: 1;
        position: absolute;
        top: -1px;
        right: -26px;
        padding: 5.5px;
        background: #009fda;
      }
    }
    .row-tools {
      height: 60vh;
      overflow-y: scroll;
      position: relative;
    }
    .loading-spinner {
      z-index: 500;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: ${isLoading ? 'flex' : 'none'};
      background: ${hexToRGB(currentTheme.texts, 0.3)};
      justify-content: center;
      align-items: center;
    }
    .timelineWithoutColor{
      font-size: 14px;
      font-weight: bold;
    }
    .textWithoutColor{
      font-size: 14px;
      opacity: 0.6;
    }
    .selectRegion{
      color:gray
    }
    .placeholder{
      color:#63513D!important;
    }
    .icon-placeholder{
      background :#63513D!important;
    }
    .selectScenes{
      width: 100%;
    }
    .MuiFilledInput-root{
      background: transparent;
      margin-top:-15px;
    }
    .MuiFilledInput-root:hover{
      background: transparent;
    }
    .MuiSelect-select:focus{
      background: transparent;
    }
    .MuiSelect-select.MuiSelect-select {
      padding-top: 10px;
    }
  `;
};

export { SceneDesignStyles };
