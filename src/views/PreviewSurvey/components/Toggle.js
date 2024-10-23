import React from 'react';
import { styleToggle } from '../styles';

function Toggle({ isChecked, onChange }) {
  return (
    <label css={styleToggle()}>
      <input type="checkbox" checked={isChecked} onChange={() => onChange()} />
      <span className="slider round" />
    </label>
  );
}

export default Toggle;
