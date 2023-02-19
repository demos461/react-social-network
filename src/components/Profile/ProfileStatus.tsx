import React, { ChangeEvent, FC, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';
import { updateUserStatus } from '../../redux/reducers/profile-reducer';
import s from './style/ProfileStatus.module.scss';

type ProfileStatusProps = {
  isOwner: boolean;
};

export const ProfileStatus: FC<ProfileStatusProps> = memo(({ isOwner }) => {
  const dispatch = useDispatch();
  const status = useSelector<AppRootStateType, string>(state => state.profilePage.status);
  const [editMode, setEditMode] = useState(false);
  const [statusValue, setStatusValue] = useState(status);

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    setEditMode(false);
    dispatch(updateUserStatus(statusValue));
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusValue(e.currentTarget.value);
  };

  return (
    <div>
      {editMode && isOwner ? (
        <input
          className={s.statusInput}
          type='text'
          value={statusValue}
          onBlur={offEditMode}
          onChange={onStatusChange}
          autoFocus
        />
      ) : (
        <div className={s.status} onClick={onEditMode}>{status || (isOwner && 'Set status...')}</div>
      )}
    </div>
  );
});
