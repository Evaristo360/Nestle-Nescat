import { css } from '@emotion/react';

export const modalStyle = css`
  position: fixed;
  width: 100%;
  height: 100%;
  color: white;
  background-color: #0d0d0d;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  a {
    text-decoration: none;
  }
  .modalContent {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    color: rgba(0, 255, 238, 1);
    font-size: 1rem;
  }
  p {
    color: white;
    opacity: 0.5;
  }
`;
