import { shape, string, bool, number, oneOf } from 'prop-types';

const fieldType = shape({
  id: string,
  name: string.isRequired,
  type: oneOf(['text', 'password', 'textarea', 'select']),
  placeholder: string.isRequired,
  label: string,
  disabled: bool
}).isRequired;

const inputType = shape({
  variant: oneOf([undefined, 'filled', 'outlined']),
  margin: oneOf(['normal', 'dense']),
  multilineRows: number,
  fullWidth: bool
});

const buttonType = shape({
  variant: oneOf(['contained', 'outlined', 'text']),
  size: oneOf(['large', 'medium', 'small']),
  color: oneOf(['default', 'inherit', 'primary', 'secondary']),
  fullWidth: bool
});

const defaultProps = {
  inputType: {
    variant: 'outlined',
    margin: 'dense',
    multilineRows: 4,
    fullWidth: true
  },
  buttonType: {
    variant: 'contained',
    size: 'large',
    color: 'primary',
    fullWidth: true
  }
};

export { fieldType, inputType, buttonType, defaultProps };
