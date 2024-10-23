import useModal from './useModal';

function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Emitter.prototype.emit = function (type) {
  if (this.events[type]) {
    this.events[type].forEach(function (listener) {
      listener();
    });
  }
};

const modal = new Emitter();

const usePromiseModal = (props) => {
  const { title, text, openModal, toggleModal, showModal } = useModal();

  const onAccept = () => {
    modal.emit('accept');
    toggleModal();
  };

  const onCancel = () => {
    modal.emit('cancel');
    toggleModal();
  };

  const handleOpenModal = (title, text) => {
    openModal(title, text);

    return new Promise((resolve, reject) => {
      modal.on('accept', () => resolve(true));
      modal.on('cancel', () => resolve(false));
    });
  };

  return {
    onAccept,
    onCancel,
    showModal,
    openModal: handleOpenModal,
    title,
    text
  };
};

export default usePromiseModal;
