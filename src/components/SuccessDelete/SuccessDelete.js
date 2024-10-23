import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import trash from './Icon awesome-trash.svg';

const SuccessDelete = ({
  onClick,
  visible,
  erasedElement
}) => {
  const { currentTheme } = useTheme();
  const styles = css`
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #0E0E0E99 0% 0% no-repeat padding-box;
    .label_1 {
      margin-top: 28px;
      text-align: center;
      font: normal normal normal 32px Roboto;
      letter-spacing: 4.2px;
      color: #FFFFFF;
      text-transform: uppercase;
      opacity: 1;
    }
    .label_2 {
      margin-top: 16px;
      text-align: center;
      font: normal normal normal 32px Roboto;
      letter-spacing: 4.2px;
      color: #FFFFFF;
      opacity: 1;
    }
  `;

  if (!visible) return null;

  return (
    <div className="animate backInRight animate__backInRight" css={styles} onClick={onClick}>
      <div className="image">
        <img
          // className={classes.image}
          src={trash}
          alt={'trash'}
        />
      </div>
      <div className="label_1">
        <p> BORRADO </p>
      </div>
      <div className="label_2">
        <p> El {erasedElement} ha sido borrado exitosamente. </p>
      </div>
    </div>
  );
};

export default SuccessDelete;
