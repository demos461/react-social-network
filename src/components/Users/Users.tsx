import React, { FC, memo } from 'react';
import { UserType } from '../../redux/reducers/users-reducer';
import s from '../../styles/Users.module.css';
import { ReactComponent as UserIcon } from 'assets/images/user.svg';
import { NavLink } from 'react-router-dom';
import Paginator from '../Paginator/Paginator';

type UsersProps = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  users: UserType[];
  currentPage: number;
  onPageChanged: (page: number) => void;
  followingInProgress: number[];
  totalUsersCount: number;
  pageSize: number;
};

const Users: FC<UsersProps> = memo(
  ({
    users,
    unfollow,
    follow,
    currentPage,
    onPageChanged,
    followingInProgress,
    totalUsersCount,
    pageSize,
  }) => {
    return (
      <div>
        {users &&
          users.map(u => (
            <div key={u.id} className={s.user}>
              <div className={s.userAvatar}>
                <NavLink to={'/profile/' + u.id}>
                  {u.photos.small ? (
                    <img src={u.photos.small} alt="user-avatar" />
                  ) : (
                    <UserIcon />
                  )}
                </NavLink>
                {u.followed ? (
                  <button
                    onClick={() => unfollow(u.id)}
                    disabled={followingInProgress.some(id => id === u.id)}
                    className={s.btn}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => follow(u.id)}
                    disabled={followingInProgress.some(id => id === u.id)}
                    className={s.btn}
                  >
                    Follow
                  </button>
                )}
              </div>
              <div>
                <NavLink to={'/profile/' + u.id} className={s.userName}>
                  {u.name}
                </NavLink>
                <div className={s.userStatus}>{u.status}</div>
              </div>
            </div>
          ))}
        <Paginator
          totalItemsCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          portionSize={10}
        />
      </div>
    );
  },
);

export default Users;
