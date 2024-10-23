import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, IconButton } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@material-ui/icons';

const PasswordAdornment = (props) => {
  const { fieldStatus, onClick, onMouseDown } = props;

  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={onClick}
        onMouseDown={onMouseDown}
        edge="end"
      >
        {fieldStatus ? (
          <VisibilityIcon color="primary" fontSize="small" />
        ) : (
          <VisibilityOffIcon fontSize="small" />
        )}
      </IconButton>
    </InputAdornment>
  );
};

PasswordAdornment.defaultProps = {
  onClick: () => {},
  onMouseDown: () => {},
  fieldStatus: false
};

PasswordAdornment.propTypes = {
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  fieldStatus: PropTypes.bool
};

export { PasswordAdornment };
