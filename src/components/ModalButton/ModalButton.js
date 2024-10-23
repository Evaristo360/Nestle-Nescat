/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';
import useAxios from 'hooks/useAxios';
import { useIntl } from 'react-intl';
import { messages } from './messages';
import { DeleteUserContext } from 'components/DeleteUser/hooks/DeleteUserContext';
import { UpdatePasswordContext } from 'components/UpdatePassword/hooks/UpdatePasswordContext';
import { modalButton } from 'components/styles/ModalButton.css';

const { deleteRequest, put } = useAxios();

const ModalButton = (props) => {
  const intl = useIntl();
  const { setShowModal } = useContext(UpdatePasswordContext);
  const { setShowDeleteModal } = useContext(DeleteUserContext);

  async function requestPasswordChange() {
    let response = await put('/clients/force_reset', {
      id: props.userId
    });

    setShowModal(false);
  }

  async function requestUserDelete() {
    let response = await deleteRequest(`/users/${props.userId}?type=active`);
    props.change();

    setShowDeleteModal(false);
  }

  if (props.type === 'deleteUser') {
    return props.children === 'Aceptar' ? (
      <a onClick={requestUserDelete} css={modalButton}>
        {intl.formatMessage(messages.accept)}
      </a>
    ) : (
      <a onClick={() => setShowDeleteModal(false)} css={modalButton}>
        {intl.formatMessage(messages.cancel)}
      </a>
    );
  }
  //If it came from Change password
  else {
    return props.children === 'Aceptar' ? (
      <a onClick={requestPasswordChange} css={modalButton}>
        {intl.formatMessage(messages.accept)}
      </a>
    ) : (
      <a onClick={() => setShowModal(false)} css={modalButton}>
        {intl.formatMessage(messages.cancel)}
      </a>
    );
  }
};

export default ModalButton;
