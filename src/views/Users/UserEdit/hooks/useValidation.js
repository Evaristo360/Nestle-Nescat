import { useEffect, useState } from 'react';

const fieldsValidation = {
  name: {
    required: true,
    format: '',
    noTyping: false,
    maxLength: 50,
    typingValidation: ''
  },
  phone: {
    required: true,
    format: /^\+?\d{10,15}$/,
    noTyping: true,
    maxLength: 15,
    typingValidation: /^\+?\d*$/
  },
  email: {
    required: true,
    format: /^\w+([\.-]?\w+)*@\w+\.\w{2,}$/,
    noTyping: false,
    maxLength: 50,
    typingValidation: ''
  }
};

const useValidation = (initialValidationState) => {
  const inputs = Object.keys(fieldsValidation);
  const initValidState = {};

  inputs.forEach((input) => (initValidState[input] = true));
  const [validationStates, validate] = useState(initValidState);

  const validateData = function (data, name) {
    let typing = true;
    let isValid = true;
    let format = true;
    let empty = false;
    let isLongest = false;

    if (fieldsValidation[name].required && data.length == 0) {
      isValid = false;
      empty = true;
    }

    if (
      fieldsValidation[name].format &&
      !fieldsValidation[name].format.test(data)
    ) {
      isValid = false;
      format = false;
    }

    if (
      fieldsValidation[name].maxLength &&
      data.length > fieldsValidation[name].maxLength
    ) {
      isLongest = true;
      typing = false;
    }

    if (!empty && fieldsValidation[name].noTyping) {
      if (!fieldsValidation[name].typingValidation.test(data)) {
        typing = false;
      }
    }

    if (typing) {
      validate({
        ...validationStates,
        [name]: isValid
      });
    }

    return typing;
  };

  return [validationStates, validateData];
};

export default useValidation;
