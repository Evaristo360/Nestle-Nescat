import { messages } from '../../Profiles/ProfileMessages';
import { intlExt } from 'providers/intlExt';

export const createValidation = (name, validations) => ({ name, validations });

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const hasOnlyLetters = (str) => onlyLettersValidation.pattern.test(str);

export const emailValidation = {
  func: isValidEmail,
  msg: intlExt.formatMessage(messages.invalidEmail)
};
//
export const requiredValidation = {
  required: true,
  msg: intlExt.formatMessage(messages.required)
};

export const onlyLettersValidation = {
  pattern: /^[A-Za-z, ,ñ,á,é,í,ó,ú,Á,É,Í,Ó,Ú]+$/,
  msg: intlExt.formatMessage(messages.onlyLetters)
};

export const createMaxFileSizeValidation = (sizeMB) => ({
  func: (file) => file && file.size / 1024 / 1024 < sizeMB,
  msg: `${intlExt.formatMessage(messages.bigSize)} ${sizeMB}MB`
});

export const isValidPhone = (phone) => /^\d+$/.test(phone);

export const createFileTypeValidation = (supportedTypes) => {
  const isValidType = (filename, supportedTypes) => {
    let words = filename.split('.');
    let ext = words[1];

    return (
      ext && supportedTypes.indexOf(`.${ext}`) !== -1 && words.length === 2
    );
  };

  return {
    func: (file) => isValidType(file.name, supportedTypes),
    msg: `${intlExt.formatMessage(messages.invalidType)} ${supportedTypes.join(
      ', '
    )}`
  };
};

export const phoneValidations = [
  { func: isValidPhone, msg: intlExt.formatMessage(messages.onlyNumbersTel) },
  {
    func: (phone) => phone.length === 10,
    msg: intlExt.formatMessage(messages.telLength)
  }
];

export const validate8Chars = (password) => password.length >= 8;

export const validateOneMayus = (password) => {
  let ocurrences = password.match(/[A-Z,Á,É,Í,Ó,Ú]/g);

  return ocurrences && ocurrences.length > 0;
};

export const validateOneDigit = (password) => {
  let ocurrences = password.match(/\d/g);

  return ocurrences && ocurrences.length > 0;
};
