import React from 'react';
import Post from "./Post";
import  styles from '../styles/Posts.module.css'

const Posts: React.FC = () => {
    return (
        <>
            <div>My posts</div>
            <div className={styles.posts_form}>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <Post message='Hello World!'/>
            <Post message='=^.^='/>
        </>
    );
};

export default Posts;