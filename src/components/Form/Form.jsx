/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@material-ui/core';
import { PasswordAdornment } from './Adornments';
import { Autocomplete } from './Autocomplete';
import * as types from './types';
import { useStyles } from './FormStyles';

const Form = (props) => {
  const classes = useStyles();

  const {
    fields,
    initialValues,
    validationRules,
    handleSubmit,
    buttonSubmitLabel,
    error,
    ignoreInputErrorStyle,
    disableSubmitOnFormInvalid,
    validateOnMount,
    inputProps,
    buttonSubmitProps,
    withInputsBackground,
    withInputsBorder,
    autoFocus,
    ...otherProps
  } = props;

  const formik = useFormik({
    initialValues,
    validationSchema: validationRules,
    onSubmit: handleSubmit
  });

  const passwordFields = fields.filter(
    (fieldItem) => fieldItem.type === 'password'
  );

  const [passwordInputs, setPasswordInputs] = useState(
    passwordFields.map((fieldItem) => ({ ...fieldItem, showPassword: false }))
  );

  const handleClickShowPassword = (fieldName) => {
    const passwordInputsUpdated = passwordInputs.map((inputItem) => {
      const { name, showPassword } = inputItem;

      return {
        ...inputItem,
        showPassword: name === fieldName ? !showPassword : showPassword
      };
    });

    setPasswordInputs(passwordInputsUpdated);
  };

  const getShowPasswordStatus = (fieldName) => {
    const passwordInput = passwordInputs.find(
      (inputItem) => inputItem.name === fieldName
    );

    return passwordInput.showPassword;
  };

  const handleMouseDownPassword = (fieldName) => {};

  useEffect(() => {
    if (validateOnMount) formik.validateForm();
  }, []);

  const inputPasswordProps = {
    endAdornment: (
      <PasswordAdornment
        fieldStatus={getShowPasswordStatus(field.name)}
        onClick={() => handleClickShowPassword(field.name)}
        onMouseDown={() => handleMouseDownPassword(field.name)}
      />
    )
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`${classes.form} ${
        withInputsBackground ? classes.withInputBackground : ''
      } ${withInputsBorder ? '' : classes.withoutInputBorder}`}
      {...otherProps}
    >
      {fields.map((field, index) =>
        field.type === 'select' ? (
          <Autocomplete
            key={index}
            field={field}
            inputProps={inputProps}
            error={
              formik.touched[field.name] &&
              formik.errors[field.name] &&
              !ignoreInputErrorStyle &&
              true
            }
            helperText={formik.touched[field.name] && formik.errors[field.name]}
            onChange={formik.setFieldValue}
            options={field.options}
            value={formik.values[field.name]}
            getOptionLabel={field.getOptionLabel}
          />
        ) : (
          <TextField
            autoFocus={autoFocus && index === 0}
            fullWidth={inputProps.fullWidth}
            disabled={field.disabled}
            id={field.id}
            name={field.name}
            label={field.label}
            type={
              field.type === 'password' && getShowPasswordStatus(field.name)
                ? 'text'
                : field.type
            }
            placeholder={field.placeholder}
            key={`form-${field.name}-${index}`}
            multiline={field.type === 'textarea'}
            rows={
              field.type === 'textarea' ? inputProps.multilineRows : undefined
            }
            variant={inputProps.variant}
            margin={inputProps.margin}
            InputProps={
              field.type === 'password' ? inputPasswordProps : undefined
            }
            value={formik.values[field.name]}
            onChange={formik.handleChange}
            error={
              (formik.touched[field.name] || field.type === 'textarea') &&
              formik.errors[field.name] &&
              !ignoreInputErrorStyle &&
              true
            }
            helperText={
              (formik.touched[field.name] || field.type === 'textarea') &&
              formik.errors[field.name]
            }
          />
        )
      )}

      <Button
        type="submit"
        disabled={disableSubmitOnFormInvalid && !formik.isValid}
        {...buttonSubmitProps}
      >
        <Typography variant="body1" color="textPrimary">
          {buttonSubmitLabel}
        </Typography>
      </Button>

      {error && <p className={classes.submitError}>{error}</p>}
    </form>
  );
};

Form.defaultProps = {
  inputProps: types.defaultProps.inputType,
  buttonSubmitProps: types.defaultProps.buttonType,
  withInputsBackground: true,
  withInputsBorder: false,
  autoFocus: false
};

Form.propTypes = {
  fields: PropTypes.arrayOf(types.buttonType),
  inputProps: types.inputType,
  buttonSubmitProps: types.buttonType,
  initialValues: PropTypes.object,
  validationRules: PropTypes.object,
  disableSubmitOnFormInvalid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  buttonSubmitLabel: PropTypes.string.isRequired,
  error: PropTypes.string,
  ignoreInputErrorStyle: PropTypes.bool,
  validateOnMount: PropTypes.bool,
  withInputsBackground: PropTypes.bool,
  withInputsBorder: PropTypes.bool,
  autoFocus: PropTypes.bool
};

export { Form };
