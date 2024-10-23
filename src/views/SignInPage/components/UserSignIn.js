import React, { useState } from 'react';
import { userSignIn } from '../styles';
import useError from '../hooks/useError';
import useSignIn from '../hooks/useSignIn';

import SignInHeader from './SignInHeader';
import SignInForm from './SignInForm';
import RecoveryPasswordModal from './RecoverPasswordModal';
import HelloImage from './HelloImage';
import SignInFooter from './SignInFooter';
import nestleHorizontal from 'assets/nestle_horizontal_white.svg';
import SuccessDelete from './SuccessDelete.js';

function UserSignIn({ onRedirect }) {
  const [isRecoveryModalVisible, onChangeRecoveryModalStatus] = useState(false);
  const [SignInError, updateSignInError] = useError();
  const { loading, onSignIn } = useSignIn(onRedirect, updateSignInError);

  return (
    <div css={userSignIn}>
      <img
        src={nestleHorizontal}
        style={{
          position: 'absolute',
          paddingLeft: '5%',
          marginTop: '-5%',
          width: '18%'
        }}
        alt="nestle-horizontal"
      />
      <SignInHeader />

      <div className="user-signin--wrapper">
        <HelloImage />

        <SignInForm
          onClickRecovery={() => onChangeRecoveryModalStatus(true)}
          onComplete={onSignIn}
          onError={updateSignInError}
        />
      </div>

      {/* <RecoveryPasswordModal
        visible={isRecoveryModalVisible}
        onClose={() => onChangeRecoveryModalStatus(false)}
        onError={(err) => {
          onChangeRecoveryModalStatus(false);
          updateSignInError(err);
        }}
      /> */}

      <SuccessDelete
        visible={isRecoveryModalVisible}
        onClose={() => onChangeRecoveryModalStatus(false)}
        onError={(err) => {
          onChangeRecoveryModalStatus(false);
          updateSignInError(err);
        }}
      />

      <SignInError />

      <div className="footer-rw">
        <SignInFooter />
      </div>
    </div>
  );
}

export default UserSignIn;
