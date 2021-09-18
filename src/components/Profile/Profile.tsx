import React from "react";
import styles from "../../styles/Profile.module.css";
import ProfileInfo from "./ProfileInfo";
import Posts from "./Posts/Posts";
import { PostType } from "../../redux/state";

type ProfileProps = {
  posts: Array<PostType>;
};

const Profile: React.FC<ProfileProps> = ({ posts }) => {
  return (
    <div className={styles.profile}>
      <ProfileInfo />
      <Posts posts={posts} />
    </div>
  );
};

export default Profile;
