/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import useErrorDictionary from '../hooks/useErrorDictionary';
import Modal from '../../../components/Modal';

function ErrorModal({ error, ...props }) {
  return (
    <Modal {...props}>
      <h1 style={{ marginRight: '60px', marginLeft: '60px' }}>
        {error ? useErrorDictionary(error) : null}
      </h1>
    </Modal>
  );
}

export default ErrorModal;
