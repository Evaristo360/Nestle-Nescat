import React, { useState } from 'react';

import CorporateEmail from '../components/CorporateEmail';
import PINValidation from '../components/PINValidation';
import PINError from '../components/PINError';
import SuccessMessage from '../components/SuccessMessage';

function useRecoveryView() {
  const [viewName, updateViewName] = useState('Corporate Email');

  function CurrentView({ ...props }) {
    switch (viewName) {
      case 'Corporate Email':
        return (
          <CorporateEmail
            onSuccessCallback={() => updateViewName('PIN Validation')}
            {...props}
          />
        );
      case 'PIN Validation':
        return (
          <PINValidation
            onSuccessCallback={() => updateViewName('Success')}
            onIncorrectPin={() => updateViewName('PIN Error')}
            {...props}
          />
        );
      case 'PIN Error':
        return (
          <PINError
            onRetry={() => updateViewName('Corporate Email')}
            {...props}
          />
        );
      case 'Success':
        return <SuccessMessage {...props} />;

      default:
        return (
          <CorporateEmail
            onSuccessCallback={() => updateViewName('PIN Validation')}
            {...props}
          />
        );
    }
  }

  return {
    CurrentView
  };
}

export default useRecoveryView;
