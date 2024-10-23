import React from 'react';
import octopyImg from 'assets/octopy-letras.svg';
import { footerStyle } from '../styles';
import { FormattedMessage } from 'react-intl';
import { messages } from '../messages';

function SignInFooter() {
  return (
    <div css={footerStyle}>
      <p style={{ marginBottom: '7px' }}>
        <FormattedMessage {...messages.footerDescription} />
      </p>

      <p className="p-oc">
        <FormattedMessage
          {...messages.footerYear}
          values={{ image: <img src={octopyImg} alt="octopy" /> }}
        />
      </p>
    </div>
  );
}

export default SignInFooter;
