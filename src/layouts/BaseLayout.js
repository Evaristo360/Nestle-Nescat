import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const BaseLayout = ({ children }) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        display: flex;
        height: 100vh;
        width: 100%;
        background: ${currentTheme.background};
      `}
    >
      {children}
    </div>
  );
};

export default BaseLayout;
