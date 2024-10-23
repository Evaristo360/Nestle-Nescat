import React from 'react';
import ModalButton from 'components/ModalButton';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import { useIntl } from 'react-intl';
import { messages } from './messages';

const DeleteUser = (props) => {
  const intl = useIntl();
  const { currentTheme } = useTheme();

  const modalStyle = css`
    position: fixed;
    width: 100%;
    height: 100%;
    color: ${currentTheme.titles};
    background-color: ${currentTheme.background};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    a {
      text-decoration: none;
    }
    .modalContent {
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h2 {
      color: ${currentTheme.titles};
      font-size: 1rem;
    }
  `;

  let text = intl.formatMessage(messages.deleteConfirm).toUpperCase();

  return (
    <div css={modalStyle}>
      <div className="modalContent">
        <h2>{text}</h2>
        <br />
        <div id="buttons">
          <ModalButton type="deleteUser" userId={props.userId} change={props.change}>
            {intl.formatMessage(messages.accept)}
          </ModalButton>
          <ModalButton type="deleteUser">
            {intl.formatMessage(messages.cancel)}
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
