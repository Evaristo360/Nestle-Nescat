import React from 'react';
import { pinErrorStyle } from '../styles';
import { pinError } from '../styles/corporateEmial.css';
import RecoveryButton from './RecoveryButton';

import SignInButton from './SignInButton';

function PINError({ onRetry, onClose }) {
  return (
    <div css={pinError}>
      <div className="container">
        <div className="modal-content">
          <h1 className="corporate-email--title">PIN INCORRECTO O TIEMPO EXPIRADO</h1>

          <div className="row ml-5 mb-4 button">
            <RecoveryButton fullWidth={false} onClick={onRetry}>Reenviar PIN</RecoveryButton>
            <RecoveryButton fullWidth={false} onClick={onClose}  dark>Cancelar</RecoveryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PINError;
