import React from 'react';
import s from '../../styles/Profile.module.css';
import ProfileInfo from './ProfileInfo';
import PostsContainer from './Posts/PostsContainer';
import {UserProfileType} from '../../redux/reducers/profile-reducer';

type ProfileProps = {
    profile: UserProfileType
    status: string
    updateUserStatus: (status: string) => void
};

const Profile: React.FC<ProfileProps> = ({profile,status,updateUserStatus}) => {
    return (
        <div className={s.profile}>
            <ProfileInfo profile={profile} status={status} updateUserStatus={updateUserStatus}/>
            <PostsContainer />
        </div>
    );
};

export default Profile;
