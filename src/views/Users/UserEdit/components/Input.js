import React, { useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from '../../../contexts/themeContext';

const Input = ({
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
        color: ${currentTheme.texts};

       .label {
         height: 15px;
         width: 100%;
         font: normal normal normal 12px/15px Verdana;
         letter-spacing: 0.6px;
         color: ${currentTheme.texts};
         margin-bottom: 7px;
       }

       .input {
         border: none;
         height: 39px;
         width: 100%;
         border-bottom: 1px solid ${currentTheme.titles};
         background-color: transparent;
         color: ${currentTheme.texts};
         margin-left: 5px;

         ::placeholder {
           font: normal normal normal 14px/13px Verdana;
           color: ${currentTheme.texts};
           opacity: 0.5;
        }

        :focus {
          border: none
          border-bottom: 1px solid ${currentTheme.titles};
          outline: none;
        }
       }
      `}
    >
      <label className="label">{label}</label>
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

export default Input;
