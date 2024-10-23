import { css } from '@emotion/react';

export const suspensePageStyle = ({ currentTheme }) =>
  css`
    margin: auto;
    width: 100%;
    height: 100vh;
    background: ${currentTheme.background};
    display: flex;
    flex-direction: column;
    justify-content: center;

    .suspense-page--title {
      font: normal normal bold 55px/69px Verdana;
      letter-spacing: 0px;
      color: ${currentTheme.texts};
      text-align: center;
    }

    .suspense-page--subtitle {
      font: normal normal normal 40px/48px Verdana;
      text-align: center;
      color: ${currentTheme.texts};
      opacity: 0.5;
    }

    .suspense-page--loading-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5rem;
    }

    .suspense-page--decorator {
      width: 17px;
      height: 17px;
      background: ${currentTheme.titles};
      border-radius: 100%;
      animation: suspense-stretchdelay 1.2s infinite ease-in-out;

      :not(:last-child) {
        margin-right: 0.8rem;
      }

      :nth-child(2) {
        animation-delay: -1.1s;
      }
      :nth-child(3) {
        animation-delay: -1s;
      }
    }

    @keyframes suspense-stretchdelay {
      0%,
      40%,
      100% {
        transform: scale(1);
      }
      20% {
        transform: scale(1.6);
      }
    }
  `;
