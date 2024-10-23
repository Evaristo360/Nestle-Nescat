/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import { inputStyle3 } from '../styles/signinInput.css';

function RecoveryInput({ labelText, border = false, ...props }) {
  const label = labelText ? <p>{labelText}</p> : null;

  return (
    <div css={inputStyle3}>
      <div
        style={{
          background: border
            ? '#232323 0% 0% no-repeat padding-box'
            : 'transparent'
        }}
        className="container-input"
      >
        <div className="form-item-input-label">{label}</div>
        <input className="form-item-input" {...props} />
      </div>
    </div>
  );
}

RecoveryInput.propTypes = {
  placeholder: PropTypes.string
};

export default RecoveryInput;
