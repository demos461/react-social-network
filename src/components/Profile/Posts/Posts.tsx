import React, {ChangeEvent} from 'react';
import Post from './Post';
import styles from '../../../styles/Posts.module.css';
import {PostType} from '../../../redux/state';

type PostsProps = {
    posts: Array<PostType>;
    addPost: () => void
    newPostText: string;
    changeNewPostText: (post: ChangeEvent<HTMLTextAreaElement>) => void
};

const Posts: React.FC<PostsProps> = ({posts, addPost, newPostText, changeNewPostText}) => {


    return (
        <>
            <div>My posts</div>
            <div className={styles.posts_form}>
        <textarea
            className={styles.textarea}
            placeholder={'Your news...'}
            onChange={changeNewPostText}
            value={newPostText}
        />
                <div className={styles.btn} onClick={addPost}>
                    Add post
                </div>
            </div>
            {posts && posts.map((p) => <Post key={p.id} message={p.message}/>)}
        </>
    );
};
export default Posts;
