import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

const useIntlMessages = (intlMessages) => {
  const intl = useIntl();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    loadIntlMessages(intlMessages);
  }, [intlMessages]);

  const loadIntlMessages = (intlMessages) => {
    const msgs = {};

    for (let key in intlMessages) {
      msgs[key] = intl.formatMessage(intlMessages[key]);
    }

    setMessages(msgs);
  };

  return messages;
};

export { useIntlMessages };
