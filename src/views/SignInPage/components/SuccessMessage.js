import React from 'react';
import { successMessageStyle } from '../styles';
import { pinSuccess } from '../styles/corporateEmial.css';
import RecoveryButton from './RecoveryButton';

import SignInButton from './SignInButton';

function SuccessMessage({ onClose }) {
  return (
    <div css={pinSuccess}>
      <div className="container">
        <div className="modal-content">
          <h1 className="corporate-email--title">
            Se te ha enviado una nueva contraseña. Por favor revisa tu correo
          </h1>
          <div className="button">
            <RecoveryButton onClick={onClose} fullWidth={false} >Aceptar</RecoveryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
