import React from 'react';
import s from '../../styles/Profile.module.css';
import ProfileInfo from './ProfileInfo';
import PostsContainer from './Posts/PostsContainer';
import {UserProfileType} from '../../redux/reducers/profile-reducer';

type ProfileProps = {
    profile: UserProfileType
};

const Profile: React.FC<ProfileProps> = ({profile}) => {
    return (
        <div className={s.profile}>
            <ProfileInfo profile={profile}/>
            <PostsContainer />
        </div>
    );
};

export default Profile;
