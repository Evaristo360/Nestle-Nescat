import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const Checkbox = ({
  name = 'checkbox',
  value = false,
  onChange = () => {},
  className = '',
  style = {}
}) => {
  const { currentTheme } = useTheme();

  const handleChange = (value) => {
    onChange({ [name]: value });
  };

  return (
    <button
      css={css`
        background: ${value ? '#007CBA' : 'transparent'};
        border: 2px solid ${value ? '#007CBA' : '#FFFFFF'};
        border-radius: 4px;
        width: 1.2rem;
        height: 1.2rem;
      `}
      className={className}
      style={style}
      onClick={() => handleChange(!value)}
    ></button>
  );
};

export default Checkbox;
