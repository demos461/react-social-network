import React from 'react';
import {NavLink} from 'react-router-dom';
import s from '../../styles/Header.module.css';

type HeaderProps = {
    isAuth: boolean
    login: string
    logout: () => void
}

const Header: React.FC<HeaderProps> = ({isAuth, login, logout}) => {
    return (
        <header className={s.header}>
            <div>&lt;logo/&gt;</div>
            {isAuth
                ? <div className={s.login}>{login}
                    <div className={s.logOut} onClick={logout}>Log out</div>
                </div>
                : <NavLink to={'/login'} className={s.loginBtn}>Login</NavLink>
            }
        </header>
    );
};

export default Header;
