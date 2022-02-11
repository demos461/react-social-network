import { FC } from 'react';
import { logout } from 'redux/reducers/auth-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from 'redux/store';
import { Navbar } from 'components/Navbar';
import s from './style/Header.module.scss';
import userIcon from 'assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from 'assets/images/logout.svg';

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
          <div className={s.logo}>&lt;logo/&gt;</div>

          <Navbar />

          {isAuth ? (
            <div className={s.login}>
              {login}
              <img src={photos ? photos : userIcon} alt="avatar" />
              <LogoutIcon className={s.logoutBtn} onClick={onLogoutBtnClick} />
            </div>
          ) : (
            <NavLink to={'/login'} className={s.loginBtn}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};
