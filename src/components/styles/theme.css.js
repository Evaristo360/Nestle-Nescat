import { css } from '@emotion/react';

const themeStyles = ({ currentTheme }) =>
  css`
    .emphasis {
      color: ${currentTheme.emphasis};
      font-size: 14px;
      font-weight: bold;
    }
    .text {
      color: ${currentTheme.texts};
      font-size: 14px;
      opacity: 0.6;
    }
    .little {
      font-size: 12px;
    }
    .text-secondary {
      opacity: 0.5;
    }
  `;

export default themeStyles;
