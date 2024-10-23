import { useState } from 'react';
import { formMessages } from 'providers/formMessages';
import { intlExt } from 'providers/intlExt';

export const useApiErrorMsg = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const handleApiError = (message) => {
    const msg = message.replaceAll(' ', '_');
    if (formMessages[msg] !== undefined) {
      setMessage(intlExt.formatMessage(formMessages[msg]));
      setTitle(formMessages[msg].title);
      setVisible(true);
    } else console.log(`Undefined message: ${msg}`);
  };

  const handleClose = () => setVisible(false);

  return { title, message, handleApiError, visible, handleClose };
};
