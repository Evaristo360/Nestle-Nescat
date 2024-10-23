import React, { useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const Checkbox = ({ label, name, checked, onCheck }) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        display: inline-flex;
        align-items: center;
        margin-right: 30px;

        .checkbox-label {
          margin-bottom: 0;
          font: normal normal normal 12px/15px Verdana;
          letter-spacing: 0.6px;
          color: ${currentTheme.texts};
          opacity: 0.5;
          margin-left: 15px;

        }

        .checkBox {
    	    cursor: pointer;
          position: relative;
          border: none;
          background-color: transparent;
        }
        .checkBox:before {
         content: "";
         display: block;
         position: absolute;
         width: 20px;
         height: 20px;
         top: -4px;
         left: 0;
         border: 1px solid;
         border-color: ${currentTheme.texts};
         border-radius: 5px;
         background-color: ${currentTheme.background};
        }

        .checkBox:checked:before {
          background-color: ${currentTheme.titles};
          border: none;
        }

        .checkBox:focus {
          outline:0;
        }
      }
      `}
    >
      <input
        className="checkBox"
        type="checkbox"
        checked={checked}
        name={name}
        onChange={onCheck}
      />
      <label className="checkbox-label">{label}</label>
    </div>
  );
};

export default Checkbox;
