import React from 'react';
import { modalStyle } from './modal.css';
import closeIcon from 'assets/cerrar.svg';
import Dialog from 'components/Dialog';
import SvgIcon from 'components/SvgIcon';
import { useTheme } from 'hooks/useTheme';

function Modal({ children, visible, onClose, background }) {
  const { currentTheme } = useTheme();

  const component = visible ? (
    <Dialog background={background}>
      <div css={modalStyle} style={{ background }}>
        <SvgIcon
          className="modal--close-icon"
          src={closeIcon}
          alt="Cerrar"
          color={currentTheme.texts}
          onClick={onClose}
        />

        {children}
      </div>
    </Dialog>
  ) : null;

  return component;
}

export default Modal;
