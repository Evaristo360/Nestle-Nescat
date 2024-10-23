import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
//import trash from './Icon awesome-trash.svg';
import useRecoveryView from '../hooks/useRecoveryView';

const SuccessDelete = ({
  onClose,
  visible,
  onError,
  erasedElement
}) => {
  const { currentTheme } = useTheme();
  const styles = css`
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .rusy {
      z-index: 1000;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #0E0E0E99 0% 0% no-repeat padding-box;
    }

    .children {
      position: fixed;
      z-index: 2000 !important;
    }
  `;

  if (!visible) return null;
  const { CurrentView, onChangeView } = useRecoveryView();


  return (
    <div className="animate backInRight animate__backInRight" css={styles}>
      <div className="children">
        <CurrentView
          onNextView={onChangeView}
          onError={onError}
          onClose={onClose}
        />
      </div>
      <div className="rusy" onClick={onClose}></div>
    </div>
  );
};

export default SuccessDelete;
