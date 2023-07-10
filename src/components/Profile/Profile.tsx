import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';
import { Navigate, useParams } from 'react-router-dom';
import {
  getUserFriends,
  getUserProfile,
  getUserStatus,
  ProfileStateType,
  savePhoto,
} from 'redux/reducers/profile-reducer';
import { ProfileEditForm } from './ProfileEditForm';
import { ProfileInfo } from './ProfileInfo';

type ParamsType = {
  userId?: string;
};

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { profile, friends } = useSelector<AppRootStateType, ProfileStateType>(
    state => state.profilePage,
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
    dispatch(getUserFriends());
  }, [userId]);

  if (!authUserId && !userId) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      {editMode ? (
        <ProfileEditForm
          profile={profile}

          savePhoto={handleSavePhoto}
          setEditMode={setEditMode}
        />
      ) : (
        <ProfileInfo profile={profile} onEditModeClick={setEditMode} isOwner={!userId} friends={friends} />
      )}
    </>
  );
};
