import React from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const SearchInput = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  readOnly,
  disabled
}) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        box-sizing: border-box;
        font: normal normal normal 14px/20px Verdana;
        color: #1c1c1c;
        width: 100%;

        .label {
          height: 15px;
          width: 100%;
          font: normal normal normal 12px/15px Verdana;
          letter-spacing: 0.6px;
          color: #1c1c1c;
          margin-bottom: 7px;
        }

        .input {
          vertical-align: center;
          height: 32px;
          width: 100%;
          background-color: #ffffff0d;
          border-radius: 5px;
          padding-left: 12px;
          padding-top: 3px;
          //border-bottom: 1px solid ${currentTheme.titles};

          :focus {
            //border-bottom: 1px solid ${currentTheme.titles};
          }
        }

        .text {
          width: calc(100% - 30px);
          display: inline-block;
          border: none;
          background-color: transparent;
          color: #1c1c1c;

          ::placeholder {
            font: normal normal normal 12px/13px Verdana;
            color: ${currentTheme.texts};
            opacity: 0.15;
          }
          :focus {
            outline: none;
          }
        }

        .icon {
          fill: #1c1c1c;
          opacity: 0.8;
        }
      `}
    >
      {label ? <label className="label">{label}</label> : null}
      <div className="input">
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20.686"
          height="20.686"
          viewBox="0 0 20.686 20.686"
        >
          <path
            className="a"
            d="M19.284,17.51H18.35l-.331-.319a7.7,7.7,0,1,0-.828.828l.319.331v.934l5.914,5.9,1.762-1.762Zm-7.1,0a5.322,5.322,0,1,1,5.322-5.322A5.315,5.315,0,0,1,12.188,17.51Z"
            transform="translate(-4.5 -4.5)"
          />
        </svg>
        <input
          className="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SearchInput;
