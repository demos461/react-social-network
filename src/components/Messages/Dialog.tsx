import React, {FC} from "react";
import styles from "../../styles/Messages.module.css";
import { NavLink } from "react-router-dom";
import { memo } from "react";

type DialogProps = {
  name: string;
  id: number;
};

const Dialog: FC<DialogProps> = memo(({ id, name }) => {
  let path = "/messages/" + id;
  return (
    <div className={styles.dialog}>
      <NavLink to={path} activeClassName={styles.active}>
        {name}
      </NavLink>
    </div>
  );
});

export default Dialog;
