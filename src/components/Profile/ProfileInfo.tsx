import React from "react";
import styles from "../../styles/ProfileInfo.module.css";
type ProfileInfoProps = {};

const ProfileInfo: React.FC<ProfileInfoProps> = () => {
  return (
    <div>
      <div className={styles.profileInfo}>
        <img
          src="https://cdn1.flamp.ru/96a74d31e6bd619a8f381c27ef308a76.png"
          alt="avatar"
        />
        <div className={styles.descr}>Ninja Ilya</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
