import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useStyles } from './SelectV2Styles';
import { v4 as uuidv4 } from 'uuid';

export const createOption = (label, value) => ({ label, value });

export const SelectV2 = ({
  id = uuidv4(),
  label = '',
  name = '',
  value = '',
  onChange,
  options = [],
  variant = 'outlined',
  margin = 'dense',
  size = 'small',
  className,
  style,
  labelClassName,
  disabled = false,
  native = false
}) => {
  const classes = useStyles();
  const createLabelId = (id) => `label-${id}`;

  return (
    <FormControl variant={variant} className={classes.root} margin={margin}>
      <InputLabel id={createLabelId(id)} className={labelClassName}>
        {label}
      </InputLabel>
      <Select
        className={className}
        name={name}
        id={id}
        labelId={createLabelId(id)}
        label={label}
        value={value}
        onChange={onChange}
        style={style}
        inputProps={{ className: classes.select }}
        variant="filled"
        size={size}
        disabled={disabled}
        native={native}
      >
        {native
          ? [createOption('', ''), ...options].map((op, index) => (
              <option value={op.value} key={index}>
                {op.label}
              </option>
            ))
          : options.map((op, index) => (
              <MenuItem value={op.value} key={index}>
                {op.label}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
};
