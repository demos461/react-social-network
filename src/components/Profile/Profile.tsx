import React from 'react';
import s from '../../styles/Profile.module.css';
import ProfileInfo from './ProfileInfo';
import PostsContainer from './Posts/PostsContainer';

type ProfileProps = {

};

const Profile: React.FC<ProfileProps> = () => {
    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <PostsContainer />
        </div>
    );
};

export default Profile;
