import React, {ChangeEvent} from 'react';
import Post from './Post';
import styles from '../../../styles/Posts.module.css';
import {PostType} from '../../../redux/store';

type PostsProps = {
    posts: Array<PostType>
    updateNewPostText: (text: string) => void
    addPost: () => void
    newPostText: string
};

const Posts: React.FC<PostsProps> = ({posts,newPostText, updateNewPostText, addPost}) => {


    const textareaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewPostText(e.currentTarget.value)
    }
    const addPostOnClick = () => {
        addPost()
    }


    return (
        <>
            <div>My posts</div>
            <div className={styles.posts_form}>
                <textarea
                    className={styles.textarea}
                    placeholder={'Your news...'}
                    onChange={textareaOnChange}
                    value={newPostText}
                />
                <div className={styles.btn} onClick={addPostOnClick}>
                    Add post
                </div>
            </div>
            {posts && posts.map((p) => <Post key={p.id} message={p.message}/>)}
        </>
    );
};
export default Posts;
