import React from 'react';
import css from 'components/Modal/Modal.module.css';

export const Modal = ({ largeImage, tag, onModalClose }) => {
  return (
    <div
      className={css.overlay}
      onClick={event => {
        if (event.target === event.currentTarget) onModalClose();
      }}
    >
      <div className={css.modal}>
        <img src={largeImage} alt={tag} />
      </div>
    </div>
  );
};
