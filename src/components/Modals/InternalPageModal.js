import React from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

import InternalDialog from '../InternalDialog';

const InternalPageModal = ({ children, visible }) => {
  const { currentTheme } = useTheme();
  const component = visible ? (
    <InternalDialog>
      <div
        css={css`
          width: 100%;
          background: ${currentTheme.background};
          color: ${currentTheme.texts};
        `}
      >
        {children}
      </div>
    </InternalDialog>
  ) : null;

  return component;
};

export default InternalPageModal;
