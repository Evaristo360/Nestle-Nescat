import React, { useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

import Checkbox from './Checkbox';

const CheckboxGroup = ({ label, subLabel, onCheck, options = [], values }) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        box-sizing: border-box;
        height: fit-content;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

        .label {
          height: 15px;
          width: 100%;
          font: normal normal normal 12px/9px Verdana;
          color: ${currentTheme.texts};
          margin-bottom: 3px;
        }

        .sub-label {
          width: 100%;
          font: normal normal normal 10px/14px Verdana;
          color: ${currentTheme.texts};
          opacity: 0.5;
          margin-bottom: 18px;
        }
      `}
    >
      <label className="label">{label}</label>
      <label className="sub-label">{subLabel}</label>
      {options.map((option) => {
        var checked = values.filter((value) => value.name == option.name)[0]
          .checked;

        return (
          <Checkbox
            key={option.name}
            checked={checked}
            label={option.label}
            name={option.name}
            onCheck={onCheck}
          />
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
