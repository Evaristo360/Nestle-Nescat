import { css } from '@emotion/react';

export const welcomeMessageStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.4s;
  animation: page-transition 0.3s linear 1s;

  .center {
    margin: auto;
    width: 50%;
    // border: 3px solid green;
    padding: 10px;
  }

  .img-nestle {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
  }

  .welcome-text {
    color: #ffffff;
    text-align: center;
    font: normal normal medium 20px/29px Roboto !important;
    letter-spacing: 0px;
    opacity: 1;
    margin-left: 5px;
  }

  .welcome-message--robot {
    width: 50rem;
    position: absolute;
    bottom: 0;
    opacity: 0.05;
  }

  .welcome-message--text {
    position: absolute;
    z-index: 2;
    transition: all 0.4s;
    animation: text-animation 0.4s linear;
  }

  @keyframes text-animation {
    0% {
      transform: scale(0.9);
      opacity: 0;
    }

    75% {
      opacity: 0.75;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes page-transition {
    0% {
      opacity: 1;
    }

    30% {
      transform: translateY(100px);
      opacity: 0;
    }

    100% {
      transform: translateY(200px);
      opacity: 0;
    }
  }
`;
