import React from 'react';
import { css } from '@emotion/react';
import ImageInput from './ImageInput';
import Checkbox from '../Checkbox';
import { useTheme } from 'hooks/useTheme';

export const createInput = (type, name, label, otherProps = {}) => ({
  type,
  name,
  label,
  ...otherProps
});

const Input = ({
  name,
  type,
  label,
  message,
  messageStyle,
  labelStyle,
  ...otherProps
}) => {
  const { currentTheme } = useTheme();
  const styles = css`
    margin-bottom: 0 !important;
    input {
      font: normal normal normal 12px/15px Verdana;
      font-size: 15px;
      background: ${currentTheme.background};
      color: #1c1c1c;
      border: none;
      border-bottom: 1px solid ${currentTheme.emphasis};
      border-radius: 0px;
      padding: 0.5rem 0.7rem;
      &:focus {
        border-bottom: 1px solid ${currentTheme.emphasis};
        background: ${currentTheme.background};
        box-shadow: none;
        outline: none;
        opacity: 1;
        color: #1c1c1c';
      }
      &:invalid {
        box-shadow: none;
        outline: none;
        opacity: 1;
      }
    }
    .label {
      font: normal normal normal 12px/15px Verdana;
      margin-left: -0.5rem;
    }
    .text {
      font-size: 15px;
      margin-bottom: 0;
      color: #1c1c1c;
    }
    .message {
      font-size: 0.55rem;
      opacity: 0.5;
    }
  `;

  switch (type) {
    case 'image':
      return (
        <ImageInput
          {...otherProps}
          name={name}
          label={label}
          message={message}
        />
      );
    case 'checkbox':
      return (
        <div className="form-group py-3" css={styles}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Checkbox {...otherProps} name={name} />
            <label
              className="text label ml-2"
              htmlFor={name}
              style={labelStyle}
            >
              {label}
            </label>
          </div>
          <label className="text message" style={messageStyle}>
            {message}
          </label>
        </div>
      );
    default:
      return (
        <div className="form-group" css={styles}>
          <label className="text label" htmlFor={name} style={labelStyle}>
            {label}
          </label>
          <input
            type={type}
            name={name}
            {...otherProps}
            className="form-control"
          />
          <label className="text message" style={messageStyle}>
            {message}
          </label>
        </div>
      );
  }
};

export default Input;
