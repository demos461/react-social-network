import React from "react";
import styles from "../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_item}>
        <NavLink to={"/profile"} activeClassName={styles.active}>
          Profile
        </NavLink>
      </div>
      <div className={styles.nav_item}>
        <NavLink to={"/messages"} activeClassName={styles.active}>
          Messages
        </NavLink>
      </div>
      <div className={styles.nav_item}>
        <NavLink to={"/news"} activeClassName={styles.active}>
          News
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
