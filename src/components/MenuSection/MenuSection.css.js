import { css } from '@emotion/react';
import hexToRGB from 'components/utils/hexToRBG';

export const section = ({ currentTheme }) =>
  css`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;

    a {
      color: ${currentTheme.texts};
      text-decoration: none;
      opacity: 0.5;

      :hover {
        opacity: 1;
      }
    }
    cursor: pointer;

    .link-active {
      opacity: 1;
    }

    #titleSection {
      display: flex;
      padding: 0.2rem;
      width: 100%;
      height: 100%;
      padding-left: 0.5rem;
      @media (max-width: 900px) {
        padding-left: 0rem;
      }
    }
    #iconImage {
      width: 20px;
      height: 20px;
      margin-top: 4px;
      margin-right: 2px;
    }
    #main {
      margin-left: 5px;
    }
    #downIcon {
      margin-top: 2px;
      margin-left: 10px;
    }

    #subSection {
      display: inline;

      ul {
        display: inline;
      }
      li {
        line-height: 22px;
        padding-left: 1rem;
        :hover {
          color: ${currentTheme.text};
        }
      }
    }

    .section {
      opacity: 1;
    }

    .button-active {
      background-color: ${hexToRGB(currentTheme.emphasis, 0.1)};
      border-radius: 3px;
    }
  `;
