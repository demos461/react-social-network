import React, { useEffect } from 'react';
import s from 'styles/App.module.scss';
import MessagesContainer from 'components/Messages/MessagesContainer';
import { Redirect, Route, Switch } from 'react-router-dom';
import UsersContainer from 'components/Users/UsersContainer';
import ProfileContainer from 'components/Profile/ProfileContainer';
import Login from 'components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from 'redux/store';
import Preloader from 'components/Preloader/Preloader';
import Error404 from 'components/Error404/Error404';
import { Header } from 'components';
import { initializeApp } from 'redux/reducers/app-reducer';

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
          <Route path={'/profile/:userId?'} render={() => <ProfileContainer />} />
          <Route path={'/messages'} render={() => <MessagesContainer />} />
          <Route path={'/users'} render={() => <UsersContainer />} />
          <Route path={'/login'} render={() => <Login />} />
          <Route render={() => <Error404 />} />
        </Switch>
      </div>
    </div>
  );
};
