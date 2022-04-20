import React, { FC, memo } from 'react';
import s from 'components/Users/style/Users.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { UserPropsType } from './types';

export const User: FC<UserPropsType> = memo(
  ({
    userId,
    userName,
    userPhoto,
    userIsFollowed,
    userStatus,
    onFollowBtnClick,
    onUnfollowBtnClick,
    followingInProgress,
  }) => {
    return (
      <div className={s.user}>
        <NavLink to={'/profile/' + userId} className={s.user_avatar}>
          {userPhoto ? <img src={userPhoto} alt="user-avatar" /> : <UserIcon />}
        </NavLink>
        <NavLink to={'/profile/' + userId} className={s.user_name}>
          {userName}
        </NavLink>
        <div className={s.user_status}>{userStatus}</div>
        {userIsFollowed ? (
          <button
            onClick={() => onUnfollowBtnClick(userId)}
            disabled={followingInProgress.some(id => id === userId)}
            className={`${s.btn} ${s.btn_red}`}
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={() => onFollowBtnClick(userId)}
            disabled={followingInProgress.some(id => id === userId)}
            className={`${s.btn} ${s.btn_green}`}
          >
            Follow
          </button>
        )}
      </div>
    );
  },
);
