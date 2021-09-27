import React from 'react';
import styles from '../../styles/Profile.module.css';
import ProfileInfo from './ProfileInfo';
import Posts from './Posts/Posts';
import {ActionsTypes, ProfilePageType} from '../../redux/store';

type ProfileProps = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
};

const Profile: React.FC<ProfileProps> = ({profilePage, dispatch}) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <Posts
                posts={profilePage.posts}
                newPostText={profilePage.newPostText}
                dispatch={dispatch}
            />
        </div>
    );
};

export default Profile;
