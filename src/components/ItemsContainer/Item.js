import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import SvgIcon from 'components/SvgIcon';
import DeleteItemIcon from 'assets/icons/remove-circle-outline.svg';

const Item = ({ data, labelProp, removeItem }) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        color: ${currentTheme.texts};
        background-color: ${currentTheme.background};
        border-radius: 10px;
        height: 40px;
        line-height: 40px;
        margin: 10px;
        position: relative;
        opacity: 0.6;
        cursor: pointer;
        .icon {
          position: absolute;
          top: 7px;
          left: 7px;
          cursor: pointer;
        }
        span {
          margin-left: 42px;
        }
      `}
    >
      <SvgIcon
        src={DeleteItemIcon}
        color={currentTheme.texts}
        width={26}
        height={26}
        className="icon"
        onClick={() => removeItem(data)}
      />
      <span>{data[labelProp]}</span>
    </div>
  );
};

export default Item;
