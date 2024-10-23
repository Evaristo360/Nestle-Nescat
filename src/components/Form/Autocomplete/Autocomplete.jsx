/* eslint-disable no-use-before-define */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Autocomplete as AutocompleteMUI } from '@material-ui/lab';
import * as types from '../types';
import { defaultGetOptionLabel } from './helpers';

const Autocomplete = (props) => {
  const {
    field,
    inputProps,
    error,
    helperText,
    onChange,
    options,
    value,
    getOptionLabel
  } = props;

  const [selectedValue, setSelectedValue] = useState(value);
  const [inputValue, setInputValue] = useState('');

  if (!options) return null;

  return (
    <AutocompleteMUI
      id={field.id}
      options={options}
      getOptionLabel={getOptionLabel}
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        onChange(field.name, newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth={inputProps.fullWidth}
          disabled={field.disabled}
          id={field.id}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          variant={inputProps.variant}
          margin={inputProps.margin}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

Autocomplete.defaultProps = {
  inputProps: types.defaultProps.inputType,
  buttonSubmitProps: types.defaultProps.buttonType,
  getOptionLabel: defaultGetOptionLabel,
  onChange: () => {}
};

Autocomplete.props = {
  options: PropTypes.array.isRequired,
  field: types.fieldType,
  inputProps: types.inputType,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  getOptionLabel: PropTypes.func,
  onChange: PropTypes.func
};

export { Autocomplete };
