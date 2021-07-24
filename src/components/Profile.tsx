import React from 'react';
import styles from '../styles/Profile.module.css'
import Posts from "./Posts";
import tyan from '../assets/images/tyan2.jpg'

const Profile: React.FC = () => {
    return (
        <div className={styles.profile}>
            <img src={tyan} alt='pictures'/>
            <div>ava + desc</div>
            <Posts/>
        </div>
    );
};

export default Profile;