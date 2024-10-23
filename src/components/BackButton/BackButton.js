import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const BackButton = ({ onClick, className, style, disabled = false }) => {
  const { currentTheme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
      css={css`
        border: none;
        background: transparent;
        &:focus {
          outline: none;
        }
        .back-icon {
          margin-right: 10px;
          fill: ${currentTheme.texts};
          opacity: 0.5;
        }

        .back-icon:hover {
          fill: #c9dd03;
          opacity: 1;
        }
      `}
    >
      <svg className="back-icon" width="20" height="20" viewBox="0 0 24 24">
        <path
          d="M30,16.5H11.745L20.13,8.115,18,6,6,18,18,30l2.115-2.115L11.745,19.5H30Z"
          transform="translate(-6 -6)"
        />
      </svg>
    </button>
  );
};

export default BackButton;
