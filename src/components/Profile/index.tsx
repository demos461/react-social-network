import React from "react";
import styles from "../../styles/Profile.module.css";
import Posts from "../Posts";
import ProfileInfo from "./ProfileInfo";

const Profile: React.FC = () => {
  return (
    <div className={styles.profile}>
      <ProfileInfo />
      <Posts />
    </div>
  );
};

export default Profile;
