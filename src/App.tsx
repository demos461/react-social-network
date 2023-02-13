import React, { useEffect } from 'react';
import s from 'styles/App.module.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Error404, Header, Login, Preloader, Users } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from 'redux/store';
import { initializeApp } from 'redux/reducers/app-reducer';
import { Profile } from 'components/Profile/Profile';

export const App = () => {
  const initialized = useSelector<AppRootStateType, boolean>(
    state => state.app.initialized,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <Preloader />;
  }
  return (
    <div className={s.app}>
      <Header />
      <div className={s.container}>
        <Switch>
          <Route path={'/'} exact render={() => <Redirect to={'/profile'} />} />
          <Route path={'/profile/:userId?'} render={() => <Profile />} />
          <Route path={'/users'} render={() => <Users />} />
          <Route path={'/login'} render={() => <Login />} />
          <Route render={() => <Error404 />} />
        </Switch>
      </div>
    </div>
  );
};
