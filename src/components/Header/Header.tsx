import { FC } from 'react';
import { logout } from 'redux/reducers/auth-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from 'redux/store';
import { Navbar } from 'components/Navbar';
import s from './style/Header.module.scss';
import { ReactComponent as UserIcon } from 'assets/images/user.svg';
import { NavLink } from 'react-router-dom';

export const Header: FC = () => {
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);
  const login = useSelector<AppRootStateType, string>(state => state.auth.login);
  const photos = useSelector<AppRootStateType, string | null>(
    state => state.profilePage.profile.photos.small,
  );
  const dispatch = useDispatch();

  const onLogoutBtnClick = () => {
    dispatch(logout());
  };
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.header_data}>
          <div className={s.logo}>
            <NavLink to={'/'}>&lt;logo/&gt;</NavLink>
          </div>

          <Navbar />

          {isAuth ? (
            <div className={s.profile}>
              {login}
              {photos ? <img src={photos} alt="avatar" /> : <UserIcon />}
              <div className={s.logout} onClick={onLogoutBtnClick}>
                Logout
              </div>
            </div>
          ) : (
            <NavLink to={'/login'} className={s.login}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};
