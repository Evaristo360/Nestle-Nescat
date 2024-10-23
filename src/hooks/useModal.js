import { useState, useEffect } from 'react';

const useModal = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ title: '', text: '' });
  const toggleModal = () => setShow(!show);

  useEffect(() => {
    if (!show) {
      setData({ title: '', text: '' });
    }
  }, [show]);

  const openModal = (title = '', text = '') => {
    setData({
      title,
      text
    });
    setShow(true);
  };

  return {
    title: data.title,
    text: data.text,
    showModal: show,
    toggleModal,
    openModal
  };
};

export default useModal;
