import React, {FC, memo} from 'react';
import {addPost,PostType} from '../../../redux/reducers/profile-reducer';
import Posts from './Posts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/store';

type PostsContainerProps = {
    posts: PostType[]
    addPost: (message: string) => void
};

const PostsContainer: FC<PostsContainerProps> = memo(({posts, addPost}) => {

    return (
        <Posts posts={posts}  addPost={addPost}/>
    );
});

const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}


export default connect(mapStateToProps, {addPost})(PostsContainer);
