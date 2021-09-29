import React from 'react';
import {
    addPost,
    PostType,
    ProfileStateType,
    updateNewPostText
} from '../../../redux/reducers/profile-reducer';
import Posts from './Posts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';
import {Dispatch} from 'redux';

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

const mapStateToProps = (state: AppRootStateType) : ProfileStateType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,

    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: () => dispatch(addPost()),
        updateNewPostText: (text: string) => dispatch(updateNewPostText(text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
