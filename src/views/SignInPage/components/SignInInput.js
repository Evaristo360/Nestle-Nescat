/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import { inputStyle } from '../styles';
import { inputStyle2 } from '../styles/signinInput.css';

function SignInInput({ labelText, ...props }) {
  const label = labelText ? <p>{labelText}</p> : null;

  return (
    <div css={inputStyle2}>
      <div className="container-input">
        <div className="form-item-input-label">{label}</div>
        <input className="form-item-input" {...props} />
      </div>
    </div>
  );

  return (
    <div css={inputStyle}>
      <div className="form-item--input-label">{label}</div>
      <input className="form-item--input" {...props} />
    </div>
  );
}

SignInInput.propTypes = {
  placeholder: PropTypes.string
};

export default SignInInput;
