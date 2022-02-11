import React, { FC } from 'react';
import s from './styles/Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from 'assets/images/profile.svg';
import { ReactComponent as UsersIcon } from 'assets/images/users.svg';
import { ReactComponent as MessagesIcon } from 'assets/images/messages.svg';

export const Navbar: FC = () => {
  return (
    <nav>
      <ul className={s.nav}>
        <li>
          <NavLink to={'/profile'} className={s.nav_link} activeClassName={s.active}>
            <ProfileIcon className={s.icon} />
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to={'/messages'} className={s.nav_link} activeClassName={s.active}>
            <MessagesIcon className={s.icon} />
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink to={'/users'} className={s.nav_link} activeClassName={s.active}>
            <UsersIcon className={s.icon} />
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
