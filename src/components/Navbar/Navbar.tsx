import React, {FC} from 'react';
import s from '../../styles/Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar: FC = () => {
    return (
        <nav className={s.nav}>
            <div className={s.nav_item}>
                <NavLink to={'/profile'} activeClassName={s.active}>
                    Profile
                </NavLink>
            </div>
            <div className={s.nav_item}>
                <NavLink to={'/messages'} activeClassName={s.active}>
                    Messages
                </NavLink>
            </div>

            <div className={s.nav_item}>
                <NavLink to={'/users'} activeClassName={s.active}>
                    Users
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
