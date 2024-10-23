import { css } from '@emotion/react';

export const modalStyle = css`
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  z-index: 300;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .modal--close-icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: 2rem;
    cursor: pointer;
    z-index: 400;
  }
`;
