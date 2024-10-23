import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const ThreeDotsButton = ({
  onClick,
  className,
  style,
  direction = 'row',
  color
}) => {
  const { currentTheme } = useTheme();

  return (
    <button
      onClick={onClick}
      style={style}
      className={className}
      css={css`
        background: transparent;
        border: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: ${direction || 'row'};
        margin:auto;
        &:focus {
          outline: none;
          box-shadow: none;
        }
        .circle {
          margin-top: 2px;
          margin-bottom: 2px;
          margin-left: ${direction === 'row' ? '2px' : 0};
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background-color: ${color || currentTheme.emphasis} !important;
        }
      `}
    >
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </button>
  );
};

export default ThreeDotsButton;
