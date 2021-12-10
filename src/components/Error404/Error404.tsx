import React from 'react';
import {NavLink} from 'react-router-dom';
import s from '../../styles/Error404.module.css'

const Error404 = () => {
    return (
        <div className={s.error}>
            <h1>Error 404</h1>
            <NavLink to={'/profile'}>
                <div className={s.btn}>to profile</div>
            </NavLink>
        </div>
    );
};

export default Error404;