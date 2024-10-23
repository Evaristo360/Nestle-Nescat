import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

export const Button = ({
  onClick,
  secondary = false, // render black button
  children,
  className,
  style,
  disabled = false
}) => {
  const { currentTheme } = useTheme();
  const theme = currentTheme;

  const styles = css`
    background: white;
    color: #5EC9FFFF;
    padding: 0.7rem 1.5rem;
    border: none;
    /* box-shadow: 0px 3px 6px #00000029; */
    border-radius: 5px;
    font-size: bold 14px;
    outline: none;
    &:focus {
      outline: none;
      box-shadow: none;
    }
    &:hover {
      background: ${secondary ? '#1C1C1C' : theme.active_button};
      color: ${theme.active_button_Text};
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  return (
    <button
      css={styles}
      onClick={onClick}
      style={style}
      className={`btn-novo ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
