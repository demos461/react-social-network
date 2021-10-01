import React from 'react';
import {
    addPost,
    PostType,
    updateNewPostText
} from '../../../redux/reducers/profile-reducer';
import Posts from './Posts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';

type PostsContainerProps = {
    posts: Array<PostType>
    newPostText: string
    addPost: () => void
    updateNewPostText: (text: string) => void
};

const PostsContainer: React.FC<PostsContainerProps> = ({posts, newPostText, addPost, updateNewPostText}) => {

    const onChangePost = (text: string) => updateNewPostText(text)
    const onAddPost = () => addPost()


    return (
        <Posts posts={posts} newPostText={newPostText} updateNewPostText={onChangePost} addPost={onAddPost}/>
    );
};

const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}


export default connect(mapStateToProps, {addPost, updateNewPostText})(PostsContainer);
