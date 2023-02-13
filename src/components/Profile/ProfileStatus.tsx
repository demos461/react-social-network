import React, { ChangeEvent, FC, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';
import { updateUserStatus } from '../../redux/reducers/profile-reducer';

type ProfileStatusProps = {
  isOwner: boolean;
};

export const ProfileStatus: FC<ProfileStatusProps> = memo(({ isOwner }) => {
  debugger;
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
          type="text"
          value={statusValue}
          onBlur={offEditMode}
          onChange={onStatusChange}
          autoFocus
        />
      ) : (
        <div onClick={onEditMode}>{status || (isOwner && 'Set status...')}</div>
      )}
    </div>
  );
});
