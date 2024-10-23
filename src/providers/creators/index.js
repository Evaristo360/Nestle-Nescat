export const createInput = (
  type,
  name,
  label,
  placeholder,
  inputProps = {}
) => ({ type, name, label, placeholder, ...inputProps });

export const createOption = (label, value) => ({ label, value });
