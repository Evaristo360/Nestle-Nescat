import React from 'react';
import useRecoveryView from '../hooks/useRecoveryView';

import Modal from '../../../components/Modal';

function RecoveryPasswordModal({ visible, onClose, onError }) {
  const { CurrentView, onChangeView } = useRecoveryView();

  return (
    <Modal visible={visible} onClose={onClose}>
      <div>
        <CurrentView
          onNextView={onChangeView}
          onError={onError}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
}

export default RecoveryPasswordModal;
