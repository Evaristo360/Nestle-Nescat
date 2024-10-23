import React from 'react';
import ModalButton from 'components/ModalButton';
import { useIntl } from 'react-intl';
import { messages } from './messages';
import { modalStyle } from './styles/ModalStyle.css';

const UpdatePassword = (props) => {
  const intl = useIntl();

  return (
    <div css={modalStyle}>
      <div className="modalContent">
        <h2>{intl.formatMessage(messages.confirmUpdatePass)}</h2>
        <p>{intl.formatMessage(messages.confirmUpdatePassBody)}</p>
        <br />
        <div id="buttons">
          <ModalButton userId={props.userId}>
            {intl.formatMessage(messages.accept)}
          </ModalButton>
          <ModalButton>{intl.formatMessage(messages.cancel)}</ModalButton>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
