import React from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const DateInput = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  readOnly,
  disabled,
  className,
  iconOnly = false
}) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        box-sizing: border-box;
        font: normal normal normal 14px/20px Verdana;
        color: ${currentTheme.texts};
        width: 100%;

       .label {
         height: 15px;
         width: 26%;
         padding-right: 7px;
         padding-left: 1px;
         font: normal normal normal 12px/15px Verdana;
         letter-spacing: 0.6px;
         color: ${currentTheme.texts};
         margin-bottom: 7px;
       }

       .input {
         display: inline-block;
         border: none;
         height: 32px;
         width: ${iconOnly ? '32px' : '64%'};
         border-bottom: 1px solid ${currentTheme.titles};
         background-color: transparent;
         color: ${currentTheme.texts};
         position: relative;
         opacity: ${iconOnly ? '0' : '0.5'};
         font: normal normal normal 12px/13px Verdana;

        ::-webkit-calendar-picker-indicator {
         cursor: pointer;
         position: absolute;
         width: 115%;
         top: 10px;
         left: -20%;
         opacity: 0;
         z-index: 2;
        }

        :focus {
          border: none
          border-bottom: 1px solid ${currentTheme.titles};
          outline: none;
        }
       }

       .icon-container {
         display: inline-block;
         width: 10%;
       }

       .icon {
         fill:none;
         stroke: ${currentTheme.titles};
         stroke-linecap:round;
         stroke-linejoin:round;
         stroke-width:2px;
         margin-left:${iconOnly ? '-10px' : 'auto'}
       }
      `}
      className={className}
    >
      {label ? <label className="label">{label}</label> : null}
      <input
        className="input"
        type="date"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
      />
      <div className="icon-container">
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20.36"
          height="22.4"
          viewBox="0 0 20.36 22.4"
        >
          <g transform="translate(-3.5 -2)">
            <path
              className="a"
              d="M6.54,6H20.82a2.04,2.04,0,0,1,2.04,2.04V22.32a2.04,2.04,0,0,1-2.04,2.04H6.54A2.04,2.04,0,0,1,4.5,22.32V8.04A2.04,2.04,0,0,1,6.54,6Z"
              transform="translate(0 -0.96)"
            />
            <path className="a" d="M24,3V7.08" transform="translate(-6.24 0)" />
            <path className="a" d="M12,3V7.08" transform="translate(-2.4 0)" />
            <path
              className="a"
              d="M4.5,15H22.86"
              transform="translate(0 -3.84)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default DateInput;
