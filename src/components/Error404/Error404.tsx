import React from 'react';
import { Link } from 'react-router-dom';
import s from './style/Error404.module.scss';

export const Error404 = () => {
  return (
    <div className={s.error}>
      <h1>Error 404</h1>
      <Link to={'/profile'} className={s.btn}>
        to profile
      </Link>
    </div>
  );
};
