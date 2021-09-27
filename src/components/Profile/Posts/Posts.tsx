import React from 'react';
import Post from './Post';
import styles from '../../../styles/Posts.module.css';
import {ActionsTypes, PostType} from '../../../redux/store';
import {addPost, updateNewPostText} from '../../../redux/reducers/profile-reducer';

type PostsProps = {
    posts: Array<PostType>;
    dispatch: (action: ActionsTypes) => void
    newPostText: string;
};

const Posts: React.FC<PostsProps> = ({posts, newPostText, dispatch}) => {


    return (
        <>
            <div>My posts</div>
            <div className={styles.posts_form}>
        <textarea
            className={styles.textarea}
            placeholder={'Your news...'}
            onChange={(e) => dispatch(updateNewPostText(e.currentTarget.value))}
            value={newPostText}
        />
                <div className={styles.btn} onClick={() => dispatch(addPost())}>
                    Add post
                </div>
            </div>
            {posts && posts.map((p) => <Post key={p.id} message={p.message}/>)}
        </>
    );
};
export default Posts;
