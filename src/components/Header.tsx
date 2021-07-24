import React from 'react';
import styles from '../styles/Header.module.css'

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <span>&lt;logo/&gt;</span>
        </header>
    );
};

export default Header;