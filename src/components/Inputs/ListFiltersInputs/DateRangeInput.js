import React, { useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import hexToRGB from '../../utils/hexToRBG';

const DateRangeInput = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  readOnly,
  disabled,
  className
}) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        font: normal normal normal 14px/20px Verdana;
        color: ${currentTheme.texts};
        width: 90px;

        .label {
          height: 15px;
          width: 90%;
          padding-right: 3px;
          padding-left: 3px;
          font: normal normal normal 12px/15px Verdana;
          letter-spacing: 0.6px;
          color: ${hexToRGB(currentTheme.texts, 0.25)};
          margin-bottom: 7px;
        }

        .input {
          display: inline-block;
          border: none;
          height: 32px;
          width: 100%;
          cursor: pointer;
          background-color: transparent;
          color: ${hexToRGB(currentTheme.texts, 0.25)};
          position: relative;
          opacity: 0.5;
          font: normal normal normal 12px/13px Verdana;
          text-align: left;
          font: normal normal bold 15px Roboto;
          letter-spacing: 0px;
          color: #63513D80;
          opacity: 1;

          ::-webkit-calendar-picker-indicator {
            cursor: pointer;
            position: absolute;
            width: 115%;
            top: 10px;
            left: -20%;
            opacity: 0;
            z-index: 2;
            color: ${currentTheme.titles};
          }

          :focus {
            cursor: pointer;
            border: none;
            outline: none;
          }
        }

        .icon-container {
          display: inline-block;
          width: 10%;
        }

        .icon {
          fill: none;
          stroke: ${currentTheme.titles};
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 2px;
        }
      `}
      className={className}
    >
      {label ? <label className="label">{label}</label> : null}
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export default DateRangeInput;
