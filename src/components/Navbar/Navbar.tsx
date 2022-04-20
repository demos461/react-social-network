import React, { FC } from 'react';
import s from './styles/Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from 'assets/icons/profile.svg';
import { ReactComponent as UsersIcon } from 'assets/icons/users.svg';
import { ReactComponent as MessagesIcon } from 'assets/icons/messages.svg';
import { ReactComponent as NewsIcon } from 'assets/icons/news.svg';
import { ReactComponent as MusicIcon } from 'assets/icons/music.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';

export const Navbar: FC = () => {
  return (
    <nav>
      <ul className={s.nav}>
        <li>
          <NavLink to={'/profile'} className={s.nav_link} activeClassName={s.active}>
            <ProfileIcon className={s.icon} />
          </NavLink>
        </li>
        <li>
          <NavLink to={'/users'} className={s.nav_link} activeClassName={s.active}>
            <UsersIcon className={s.icon} />
          </NavLink>
        </li>
        <li>
          <NavLink to={'/messages'} className={s.nav_link} activeClassName={s.active}>
            <MessagesIcon className={s.icon} />
          </NavLink>
        </li>
        <li>
          <NavLink to={'/news'} className={s.nav_link} activeClassName={s.active}>
            <NewsIcon className={s.icon} />
          </NavLink>
        </li>
        <li>
          <NavLink to={'/music'} className={s.nav_link} activeClassName={s.active}>
            <MusicIcon className={s.icon} />
          </NavLink>
        </li>
        <li>
          <NavLink to={'/settings'} className={s.nav_link} activeClassName={s.active}>
            <SettingsIcon className={s.icon} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
