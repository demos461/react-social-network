import React, {FC, memo} from 'react';
import s from '../../styles/Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsContainer from './Posts/PostsContainer';
import {UserProfileType} from '../../redux/reducers/profile-reducer';

type ProfileProps = {
    profile: UserProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (image: File) => void
};

const Profile: FC<ProfileProps> = memo(({profile,status,updateUserStatus,isOwner,savePhoto}) => {
    return (
        <div className={s.profile}>
            <ProfileInfo profile={profile} status={status} updateUserStatus={updateUserStatus} isOwner={isOwner} savePhoto={savePhoto}/>
            <PostsContainer />
        </div>
    );
});

export default Profile;
