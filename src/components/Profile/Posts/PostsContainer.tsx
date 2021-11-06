import React from 'react';
import {
    addPost,
    PostType,
} from '../../../redux/reducers/profile-reducer';
import Posts from './Posts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';

type PostsContainerProps = {
    posts: Array<PostType>
    addPost: (message: string) => void
};

const PostsContainer: React.FC<PostsContainerProps> = ({posts, addPost}) => {


    return (
        <Posts posts={posts}  addPost={addPost}/>
    );
};

const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}


export default connect(mapStateToProps, {addPost})(PostsContainer);
