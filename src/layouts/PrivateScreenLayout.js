import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const PrivateScreenLayout = ({ children }) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        position: relative;
        height: 100%;
        width: 100%;
      `}
    >
      <div
        css={css`
          width: 100%;
          top: 0px;
          position: absolute;
          z-index: 10;
        `}
        id="internal-modal-root"
      />
      <div
        css={css`
          height: 100%;
          overflow-y: auto;
          background-color: ${currentTheme.background};
          width: 100%;
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default PrivateScreenLayout;
