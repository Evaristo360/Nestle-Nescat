import React from 'react';
import useForm from '../hooks/useForm';
import useSendPIN from '../hooks/useSendPIN';
import imgRecovery from 'assets/img-recovery-pass.png';

import SignInInput from './SignInInput';
import SignInButton from './SignInButton';
import { corporateEmailRecovery } from '../styles/corporateEmial.css';
import RecoveryInput from './RecoveryInput';
import RecoveryButton from './RecoveryButton';

function CorporateEmail({ onSuccessCallback, onError, onClose }) {
  const { loading, onSendPIN } = useSendPIN(onSuccessCallback, onError);
  const [corporateInput, onSubmit, onChangeInputs, dataValidated] = useForm(
    sendInformation
  );

  function sendInformation() {
    const isInputsValid =
      Object.keys(corporateInput).length !== 0 && corporateInput.email !== '';

    if (isInputsValid) {
      return onSendPIN({ email: corporateInput.email });
    }

    onError({ error: 'noValue' });
  }

  return (
    <div css={corporateEmailRecovery}>
      <div className="modal-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <img src={imgRecovery} alt="imgRecovery" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="corporate-email-title">Recuperar contraseña</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2 className="corporate-email-description">
                Descuida. Te enviaremos un email con el enlace para cambiar la
                contraseña de tu cuenta.
              </h2>
            </div>
          </div>

          <form onSubmit={dataValidated ? onSubmit : (e) => e.preventDefault()}>
            <div className="row">
              <div className="col-md-12 mt-2">
                <RecoveryInput
                  labelText="Correo electrónico"
                  placeholder="Ej. correo@dominio.com"
                  name="email"
                  value={corporateInput.email}
                  onChange={(e) => onChangeInputs(e, 'email')}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6"></div>
              <div className="col-md-3 mlf-1">
                <RecoveryButton active={dataValidated} type="submit">
                  Enviar
                </RecoveryButton>
              </div>
              <div className="col-md-3">
                <RecoveryButton
                  onClick={() => {
                    onClose();
                  }}
                  dark
                >
                  Cancelar
                </RecoveryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* 
      <h2 className="corporate-email--description">
        Ingresa tu correo corporativo, enviaremos un PIN para verificar que eres
        tu
      </h2>

      <form
        className="corporate-email--form"
        onSubmit={dataValidated ? onSubmit : (e) => e.preventDefault()}
      >
        <SignInInput
          placeholder="Correo electrónico corporativo"
          labelText="Correo corporativo"
          name="email"
          value={corporateInput.email}
          onChange={(e) => onChangeInputs(e, 'email')}
        />

        <SignInButton active={dataValidated} type="submit">
          Enviar y continuar
        </SignInButton>
      </form> */}
    </div>
  );
}

export default CorporateEmail;
