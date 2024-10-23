import React, { useState } from 'react';

import ErrorModal from '../components/ErrorModal';
import useErrorDictionary from '../hooks/useErrorDictionary';
import CancelOkModal from 'components/CancelOkModal';

function useError(callback = () => {}) {
  const [error, updateError] = useState(null);

  function ErrorMessage() {
    return (
      <CancelOkModal
        key="hk__errormodal"
        visible={!!error}
        onCancel={()=>{updateError(false)}}
        onAccept={()=>{updateError(false)}}
        title={"Error al iniciar sesión"}
        text={error ? useErrorDictionary(error) : null}
      />
      // <ErrorModal
      //   key="hk__errormodal"
      //   visible={!!error}
      //   error={error}
      //   onClose={() => {
      //     updateError(null);
      //     callback();
      //   }}
      // />
    );
  }

  return [ErrorMessage, updateError];
}

export default useError;
