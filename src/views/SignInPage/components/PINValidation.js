import React from 'react';
import { corporateEmail } from '../styles';
import { pinValidation } from '../styles/corporateEmial.css';
import useVerifyPIN from '../hooks/useVerifyPIN';
import useForm from '../hooks/useForm';

import SignInInput from './SignInInput';
import SignInButton from './SignInButton';
import RecoveryInput from './RecoveryInput';
import RecoveryButton from './RecoveryButton';

function PINValidation({ onSuccessCallback, onError, onIncorrectPin }) {
  const { loading, onVerifyPIN } = useVerifyPIN(
    onSuccessCallback,
    onIncorrectPin
  );
  const [pinInput, onSubmit, onChangeInput] = useForm(validateInput);

  function validateInput() {
    const isInputsValid =
      Object.keys(pinInput).length !== 0 && pinInput.pinValue !== '';

    if (isInputsValid) {
      return onVerifyPIN(pinInput);
    }

    onIncorrectPin();
    // onError({ error: "noValue" });
  }

  return (
    <div css={pinValidation}>
      <div className="container">
        <div className="modal-content">
          <h1 className="corporate-email--title">Ingresar PIN</h1>
          <h2 className="corporate-email--description">
            Se ha iniciado el proceso de cambio de contraseña. Si su correo se
            encuentra registrado, recibirá un correo en breve con el PIN
            requerido, ingréselo para continuar.
          </h2>

          <form onSubmit={onSubmit}>
            <div className="input">
              <RecoveryInput
                placeholder="Ingresar código PIN"
                labelText="PIN"
                name="pinValue"
                value={pinInput.pinValue}
                onChange={onChangeInput}
              />
            </div>
            <div className="button">
              <RecoveryButton fullWidth={false} type="submit">
                Verificar
              </RecoveryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PINValidation;
