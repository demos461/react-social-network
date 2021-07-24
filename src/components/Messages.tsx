import React from 'react';
import {NavLink} from "react-router-dom";
import styles from '../styles/Messages.module.css'

const Messages: React.FC = () => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogItems}>
                <div className={styles.dialog}>
                    <NavLink to={'/messages/1'} activeClassName={styles.active}>Vasili</NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to={'/messages/2'} activeClassName={styles.active}>Petr</NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to={'/messages/3'} activeClassName={styles.active}>Igor</NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to={'/messages/4'} activeClassName={styles.active}>Oleg</NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to={'/messages/5'} activeClassName={styles.active}>Ivan</NavLink>
                </div>
            </div>
            <div className={styles.messages}>
                <div className={styles.message}>Hello world!</div>
                <div className={styles.message}>How are you?</div>
                <div className={styles.message}>Never gonna give you up</div>
            </div>
        </div>

    );
};

export default Messages;