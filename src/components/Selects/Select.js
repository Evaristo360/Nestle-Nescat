import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const IconSelect = () => (
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
);

const Select = ({
  value,
  onSelectOption = (value) => {},
  allOptions,
  name,
  placeHolder,
  disabled,
  pagination = false
}) => {
  const { currentTheme } = useTheme();
  const [optionsVisibled, updateOptionsStatus] = useState(false);
  const options = allOptions.filter((option) => option != value);

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
        cursor: pointer;
        .input {
          width: 100%;
          height: 32px;
          display: block;
          padding-left: 7px;
          font-size: 12px;
        }

        .select-value {
          padding-right: 5px;
          color: ${currentTheme.texts};
          opacity: 0.5;
          font-size: 12px;
        }

        .place-holder {
          padding-right: 5px;
          color: ${currentTheme.texts};
          opacity: 0.3;
        }

        .options-container {
          width: 100%;
          position: absolute;
          top: 32px;
          z-index: 5;
        }

        .option {
          display: flex;
          justify-content: flex-start;
          color: ${currentTheme.texts};
          background: ${currentTheme.background};
          padding-left: 7px;
          font-size: 12px;
          width: 100%;
          transition: width 0.5s;

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
          // fill: ${currentTheme.titles};
        }

        .select-options-container {
          background: #ffffff 0% 0% no-repeat padding-box;
          border: 1px solid #e9e9f0;
          border-radius: 4px;
          opacity: 1;
          width: 110%;
          height: 35px;
        }
        .content-select-item {
          padding: 9px;
        }
      `}
    >
      <div
        onClick={() => updateOptionsStatus(!optionsVisibled)}
        className="input"
        disabled={disabled}
      >
        {pagination ? (
          <div className="select-options-container">
            <div className="content-select-item">
              <span
                style={{ padding: '12px 8px 10px 8px' }}
                className="select-value"
              >
                {pagination ? `${value} / page` : value}
              </span>
              <IconSelect />
            </div>
          </div>
        ) : (
          <>
            <span className="select-value">
              {pagination ? `${value} / page` : value}
            </span>
            <IconSelect />
          </>
        )}

        {/* {placeHolder && !value && (
          <span className="place-holder">{placeHolder}</span>
        )} */}
      </div>
      {optionsVisibled ? (
        <div
          style={pagination ? { padding: '9px' } : ''}
          className="options-container"
        >
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

export default Select;
