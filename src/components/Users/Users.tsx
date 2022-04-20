import React, { FC, useEffect } from 'react';
import {
  changeCurrentPage,
  follow,
  getUsers,
  unfollow,
  UserType,
} from 'redux/reducers/users-reducer';
import Paginator from '../Paginator/Paginator';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from 'redux/store';
import { Preloader } from 'components/Preloader';
import { User } from 'components/Users/User';
import s from './style/Users.module.scss';

export const Users: FC = () => {
  const dispatch = useDispatch();
  const users = useSelector<AppRootStateType, UserType[]>(state => state.users.users);
  const pageSize = useSelector<AppRootStateType, number>(state => state.users.pageSize);
  const totalUsersCount = useSelector<AppRootStateType, number>(
    state => state.users.totalUsersCount,
  );
  const currentPage = useSelector<AppRootStateType, number>(
    state => state.users.currentPage,
  );
  const isFetching = useSelector<AppRootStateType, boolean>(
    state => state.users.isFetching,
  );
  const followingInProgress = useSelector<AppRootStateType, number[]>(
    state => state.users.followingInProgress,
  );

  const onPageChanged = (pageNumber: number) => {
    dispatch(changeCurrentPage(pageNumber));
    dispatch(getUsers(pageNumber, pageSize));
  };

  const onFollowBtnClick = (userId: number) => {
    dispatch(follow(userId));
  };

  const onUnfollowBtnClick = (userId: number) => {
    dispatch(unfollow(userId));
  };

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers(currentPage, pageSize));
    }
    // eslint-disable-next-line
  }, []);

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <div className={s.container}>
      <div className={s.users}>
        {users &&
          users.map(user => (
            <User
              userId={user.id}
              userName={user.name}
              userPhoto={user.photos.small}
              userIsFollowed={user.followed}
              userStatus={user.status}
              onUnfollowBtnClick={onUnfollowBtnClick}
              onFollowBtnClick={onFollowBtnClick}
              followingInProgress={followingInProgress}
            />
          ))}
      </div>

      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={10}
      />
    </div>
  );
};
