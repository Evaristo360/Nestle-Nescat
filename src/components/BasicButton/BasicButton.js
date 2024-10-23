import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const BasicButton = ({
  onClick,
  text = 'default',
  style,
  disabled = false,
  children
}) => {
  const { currentTheme } = useTheme();

  return (
    <button
      onClick={onClick}
      //   className={className}
      style={style}
      disabled={disabled}
      css={css`
        border: none;
        display: inline-block;
        background: ${currentTheme.button};
        color: ${currentTheme.button_Text};
        border-radius: 4px;
        width: 125%;
        font: normal normal bold 12px/14px Roboto;
        letter-spacing: 0.01px;
        text-align: center;
        cursor: pointer;
        height: 38px;
        padding: 12px 8px 10px 8px;
        box-shadow: 0px 3px 3px #0000001a;

        &:focus {
          outline: none;
        }
        :hover {
          background: ${currentTheme.active_button};
          color: ${currentTheme.active_button_Text};
        }
      `}
    >
      {children ? children : text}
    </button>
  );
};

export default BasicButton;
