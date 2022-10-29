import React from 'react';
import css from 'components/Button/Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className={css.button}>
      Load more
    </button>
  );
};
