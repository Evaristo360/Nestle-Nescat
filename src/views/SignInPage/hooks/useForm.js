import { useState } from 'react';

function useForm(callback) {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [dataValidated, setDataValidation] = useState(false);

  function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    callback();
  }

  function handleInputChange(event, type = 'default') {
    event.persist();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));

    if (type === 'email') {
      const regExp = /^\w+([\.-]?\w+)*@\w+\.\w{2,}$/;

      if (regExp.test(event.target.value)) {
        setDataValidation(true);
      }
    }
  }

  return [inputs, handleSubmit, handleInputChange, dataValidated];
}

export default useForm;
