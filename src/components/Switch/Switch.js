import React from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

export const Switch = ({
  disabled = false,
  onSwitch = null,
  label,
  isActive = true,
  legends
}) => {
  const { currentTheme } = useTheme();
  var cnSlider = isActive ? 'slider round slider-active' : 'slider round';

  function onClick() {
    if (isActive) {
      onSwitch(false);
    } else {
      onSwitch(true);
    }
  }

  return (
    <div
      css={css`
        .label {
          font: normal normal normal 12px/16px Roboto;
          letter-spacing: 0.6px;
          color: ${currentTheme.emphasis};
        }

        .option {
          font: normal normal normal 12px/16px Roboto;
          letter-spacing: 0.6px;
          color: #ffffff;
          opacity: 1;
          margin-left: 12px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 27px;
          height: 10px;
          margin-left: 10px;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #8e8e8e;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: '';
          height: 15px;
          top: -2px;
          width: 15px;
          left: -1px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider-active {
          background-color: #5ec9ff;
        }

        .slider-active:before {
          -webkit-transform: translateX(15px);
          -ms-transform: translateX(15px);
          transform: translateX(15px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}
    >
      {label ? <label className="label">{label}</label> : null}
      <label className="option">{legends ? legends[0] : 'Inactivo'}</label>
      <div onClick={disabled ? null : onClick} className="switch">
        <span className={cnSlider} />
      </div>
      <label className="option">{legends ? legends[1] : 'Activo'}</label>
    </div>
  );
};
