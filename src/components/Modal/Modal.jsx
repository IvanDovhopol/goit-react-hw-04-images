import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ onClose, modalUrl }) => {
  useEffect(() => {
    function handleKeydown(e) {
      if (e.code === 'Escape') return onClose();
    }

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  function handleClickOnBackdrop(e) {
    if (e.target === e.currentTarget) return onClose();
  }

  return (
    <Overlay onClick={handleClickOnBackdrop}>
      <ModalWindow>
        <img src={modalUrl} alt="images" />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalUrl: PropTypes.string.isRequired,
};
