import React from "react";
import Post from "./Post";
import styles from "../../styles/Posts.module.css";

const Posts: React.FC = () => {
  return (
    <>
      <div>My posts</div>
      <div className={styles.posts_form}>
        <textarea className={styles.textarea} placeholder={"Your news..."} />
        <div className={styles.btn}>Add post</div>
      </div>
      <Post message="Hello World!" />
      <Post message="=^.^=" />
    </>
  );
};

export default Posts;
