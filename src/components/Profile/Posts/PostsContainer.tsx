import React from 'react';
import {ActionsTypes, PostType} from '../../../redux/store';
import {addPost, updateNewPostText} from '../../../redux/reducers/profile-reducer';
import Posts from './Posts';

type PostsContainerProps = {
    posts: Array<PostType>;
    dispatch: (action: ActionsTypes) => void
    newPostText: string
};

const PostsContainer: React.FC<PostsContainerProps> = ({posts, dispatch, newPostText}) => {

    const onChangePost = (text: string) => dispatch(updateNewPostText(text))
    const onAddPost = () => dispatch(addPost())


    return (
        <Posts posts={posts} newPostText={newPostText} updateNewPostText={onChangePost} addPost={onAddPost}/>
    );
};
export default PostsContainer;
