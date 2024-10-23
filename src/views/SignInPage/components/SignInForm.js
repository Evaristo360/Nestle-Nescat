/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { signInForm } from '../styles';
import useForm from '../hooks/useForm';
import SignInInput from './SignInInput';
import SignInButton from './SignInButton';
import SignInFooter from './SignInFooter';
import { messages } from '../messages';
import { useIntl, FormattedMessage } from 'react-intl';

function SignInForm({ onClickRecovery, onComplete, onError }) {
  const [signInInputs, onSubmit, onChangeInputs] = useForm(sendInformation);
  const intl = useIntl();

  function sendInformation() {
    const areInputsValid =
      Object.keys(signInInputs).length !== 0 &&
      signInInputs.email !== '' &&
      signInInputs.password !== '';

    if (areInputsValid) {
      return onComplete(signInInputs);
    }

    onError({ error: 'noValues' });
  }

  const onClickRecoveryHadler = () => {
    onClickRecovery();
  };

  return (
    <div css={signInForm}>
      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <h1 className="signin-form--help">
              <FormattedMessage {...messages.title} />
            </h1>

            <form className="signin-form--form" onSubmit={onSubmit}>
              <SignInInput
                labelText="Usuario"
                placeholder={intl.formatMessage(messages.email)}
                type="email"
                name="email"
                value={signInInputs.email}
                onChange={onChangeInputs}
              />
              <SignInInput
                labelText="Contraseña"
                placeholder={intl.formatMessage(messages.password)}
                type="password"
                name="password"
                value={signInInputs.password}
                onChange={onChangeInputs}
              />
              <div className="signin-form--btn-group">
                <SignInButton type="submit">
                  <FormattedMessage {...messages.start} />
                </SignInButton>
                <span
                  role="button"
                  className="btn-group--change-password text-center"
                  tabIndex={0}
                  onClick={onClickRecoveryHadler}
                >
                  <FormattedMessage {...messages.recoverpassword} />
                </span>
              </div>
            </form>
          </div>
          <div className="col-sm-3">{/* <SignInFooter /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
