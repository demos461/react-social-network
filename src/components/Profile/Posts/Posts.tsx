import React from 'react';
import Post from './Post';
import s from '../../../styles/Posts.module.css';
import {PostType} from '../../../redux/reducers/profile-reducer';
import {useFormik} from "formik";

type PostsProps = {
    posts: Array<PostType>
    addPost: (message: string) => void
};

type FormikErrorType = {
    message?: string
}

const Posts: React.FC<PostsProps> = ({posts, addPost}) => {

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.message) {
                errors.message = 'Required';
            }
            if (values.message.length > 140) {
                errors.message = 'Post length must not be more than 140 characters'
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            addPost(values.message)
        },
    })

    return (
        <>
            <div>My posts</div>
            <form className={s.posts_form} onSubmit={formik.handleSubmit}>
                <textarea
                    {...formik.getFieldProps('message')}
                    className={s.textarea}
                    placeholder={'Your news...'}
                />
                <button className={s.btn} type={'submit'}>
                    Add post
                </button>
            </form>
            {posts && posts.map((p) => <Post key={p.id} message={p.message}/>)}
        </>
    );
};
export default Posts;
