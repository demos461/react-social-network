import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';
import { useParams } from 'react-router-dom';
import {
  getUserProfile,
  getUserStatus,
  savePhoto,
  UserProfileType,
} from 'redux/reducers/profile-reducer';
import { ProfileEditForm } from './ProfileEditForm';
import { ProfileInfo } from './ProfileInfo';

type ParamsType = {
  userId?: string;
};

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector<AppRootStateType, UserProfileType>(
    state => state.profilePage.profile,
  );

  const authUserId = useSelector<AppRootStateType, number>(state => state.auth.id);

  const { userId } = useParams<ParamsType>();

  const [editMode, setEditMode] = useState<boolean>(false);

  const handleSavePhoto = (image: File) => {
    dispatch(savePhoto(image));
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(+userId));
      dispatch(getUserStatus(+userId));
    }
    dispatch(getUserProfile(authUserId));
    dispatch(getUserStatus(authUserId));
  }, [userId]);

  return (
    <>
      {editMode ? (
        <ProfileEditForm
          profile={profile}
          savePhoto={handleSavePhoto}
          setEditMode={setEditMode}
        />
      ) : (
        <ProfileInfo profile={profile} onEditModeClick={setEditMode} isOwner={!userId} />
      )}
    </>
  );
};
