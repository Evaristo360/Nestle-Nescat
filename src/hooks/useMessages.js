import React from 'react';
import _ from 'lodash-es';

const useMessages = (messages = {}) => {
  const getMessage = (id) => _.get(messages, id, '');

  return {
    getMessage
  };
};

export default useMessages;
