import React from "react";
import styles from "../../styles/Messages.module.css";
import { NavLink } from "react-router-dom";

type DialogProps = {
  name: string;
  id: number;
};

const Dialog: React.FC<DialogProps> = ({ id, name }) => {
  let path = "/messages/" + id;
  return (
    <div className={styles.dialog}>
      <NavLink to={path} activeClassName={styles.active}>
        {name}
      </NavLink>
    </div>
  );
};

export default Dialog;
