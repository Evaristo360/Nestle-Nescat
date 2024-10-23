import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const ShadingSelect = ({
  value,
  onSelectOption = (value) => {},
  allOptions,
  name,
  placeholder = 'Selecciona una opción',
  disabled = false
}) => {
  const { currentTheme } = useTheme();
  const [optionsVisibled, updateOptionsStatus] = useState(false);
  const options = allOptions.filter((option) => option != value);
  const text = allOptions.includes(value) ? value : placeholder;

  function onClickOption(e) {
    var selectValue = e.currentTarget.dataset.value;

    onSelectOption({ value: selectValue, name: name });
    updateOptionsStatus(false);
  }

  return (
    <div
      css={css`
        width: 100%;
        position: relative;
        height: 32px;

        .floating-label {
          position: relative;
          margin-bottom: 20px;
        }

        .floating-input,
        .floating-select {
          font-size: 14px;
          padding: 4px 4px;
          display: block;
          width: 100%;
          height: 30px;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #757575;
        }

        .floating-input:focus,
        .floating-select:focus {
          outline: none;
          border-bottom: 2px solid #5264ae;
        }

        label {
          color: #999;
          font-size: 14px;
          font-weight: normal;
          position: absolute;
          pointer-events: none;
          left: 5px;
          top: 5px;
          transition: 0.2s ease all;
          -moz-transition: 0.2s ease all;
          -webkit-transition: 0.2s ease all;
        }

        .floating-input:focus ~ label,
        .floating-input:not(:placeholder-shown) ~ label {
          top: -18px;
          font-size: 14px;
          color: #5264ae;
        }

        .floating-select:focus ~ label,
        .floating-select:not([value='']):valid ~ label {
          top: -18px;
          font-size: 14px;
          color: #5264ae;
        }

        /* active state */

        .floating-input:focus ~ .bar:before,
        .floating-input:focus ~ .bar:after,
        .floating-select:focus ~ .bar:before,
        .floating-select:focus ~ .bar:after {
          width: 50%;
        }

        *,
        *:before,
        *:after {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }

        .floating-textarea {
          min-height: 30px;
          max-height: 260px;
          overflow: hidden;
          overflow-x: hidden;
        }

        /* highlighter */

        .highlight {
          position: absolute;
          height: 50%;
          width: 100%;
          top: 15%;
          left: 0;
          pointer-events: none;
          opacity: 0.5;
        }

        /* active state */

        .floating-input:focus ~ .highlight,
        .floating-select:focus ~ .highlight {
          -webkit-animation: inputHighlighter 0.3s ease;
          -moz-animation: inputHighlighter 0.3s ease;
          animation: inputHighlighter 0.3s ease;
        }

        /* animation */

        @-webkit-keyframes inputHighlighter {
          from {
            background: #5264ae;
          }
          to {
            width: 0;
            background: transparent;
          }
        }

        @-moz-keyframes inputHighlighter {
          from {
            background: #5264ae;
          }
          to {
            width: 0;
            background: transparent;
          }
        }

        @keyframes inputHighlighter {
          from {
            background: #5264ae;
          }
          to {
            width: 0;
            background: transparent;
          }
        }

        .input {
          width: 100%;
          height: 32px;
          display: block;
          padding-left: 7px;
          -webkit-box-shadow: 0px 3px 3px #00000026;
          -moz-box-shadow: 0px 3px 3px #00000026;
          box-shadow: 0px 3px 3px #00000026;
        }

        .select-value {
          padding-right: 8px;
          font: normal normal normal 12px/20px Verdana;
          color: #000;
          opacity: 0.5;
        }

        .options-container {
          width: 103%;
          position: absolute;
          top: 38px;
          left: -3%;
          z-index: 5;
          -webkit-box-shadow: 0px 3px 3px #00000026;
          -moz-box-shadow: 0px 3px 3px #00000026;
          box-shadow: 0px 3px 3px #00000026;
        }

        .option {
          height: 32px;
          display: flex;
          justify-content: flex-start;
          color: #000;
          background: ${currentTheme.background};
          padding-left: 7px;
          font: normal normal normal 12px/15px Verdana;
          width: 100%;
          transition: width 0.5s;
          align-items: center;

          :hover {
            background: ${currentTheme.button};
            color: ${currentTheme.button_Text};
            width: 125%;
            border-radius: 0px 5px 5px 0px;
          }
        }

        .icon-container {
          float: right;
          margin-right: 5px;
        }

        .select-icon {
          fill: ${currentTheme.titles};
        }

        .disabled {
          cursor: not-allowed;
        }
      `}
    >
      <div
        onClick={disabled ? null : () => updateOptionsStatus(!optionsVisibled)}
        className={`input ${disabled ? 'disabled' : ''} `}
      >
        <span className="select-value">{text}</span>
        <div className="icon-container">
          <svg
            className="select-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="7"
            viewBox="0 0 11 7"
          >
            <g transform="translate(0)">
              <path
                className="a"
                d="M8.1,11.6,2.6,6.041,4.026,4.6,8.1,8.718,12.174,4.6,13.6,6.041Z"
                transform="translate(-2.6 -4.6)"
              />
            </g>
          </svg>
        </div>
      </div>
      {optionsVisibled ? (
        <div className="options-container">
          {options.map((option, i) => (
            <div
              key={i}
              onClick={onClickOption}
              className="option"
              data-value={option}
            >
              {option}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ShadingSelect;
