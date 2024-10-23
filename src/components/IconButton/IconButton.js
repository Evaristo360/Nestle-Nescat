import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import Button from 'components/Button';
import SvgIcon from 'components/SvgIcon';

export const IconButton = ({
  onClick,
  children,
  className,
  style,
  disabled = false,
  icon
}) => {
  const { currentTheme } = useTheme();

  return (
    <Button
      onClick={onClick}
      style={style}
      className={className}
      disabled={disabled}
      css={css`
        display: table;
        .icon {
          display: table-cell;
        }
        span {
          padding-left: 5px;
          display: table-cell;
          white-space: nowrap;
        }
      `}
    >
      <SvgIcon
        src={icon}
        color={currentTheme.button_Text}
        width={20}
        height={20}
        className="icon"
      />
      <span>{children}</span>
    </Button>
  );
};
