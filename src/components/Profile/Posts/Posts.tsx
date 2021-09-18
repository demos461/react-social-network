import React from "react";
import Post from "./Post";
import styles from "../../../styles/Posts.module.css";
import { PostType } from "../../../redux/state";

type PostsProps = {
  posts: Array<PostType>;
};

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <>
      <div>My posts</div>
      <div className={styles.posts_form}>
        <textarea className={styles.textarea} placeholder={"Your news..."} />
        <div className={styles.btn}>Add post</div>
      </div>
      {posts && posts.map((p) => <Post key={p.id} message={p.message} />)}
    </>
  );
};
export default Posts;
