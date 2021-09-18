import React, {ChangeEvent} from 'react';
import styles from '../../styles/Profile.module.css';
import ProfileInfo from './ProfileInfo';
import Posts from './Posts/Posts';
import {PostType} from '../../redux/state';

type ProfileProps = {
    posts: Array<PostType>;
    addPost: () => void;
    newPostText: string;
    changeNewPostText: (post: ChangeEvent<HTMLTextAreaElement>) => void
};

const Profile: React.FC<ProfileProps> = ({posts, addPost, newPostText,changeNewPostText}) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo/>
            <Posts posts={posts} addPost={addPost} newPostText={newPostText} changeNewPostText={changeNewPostText}/>
        </div>
    );
};

export default Profile;
