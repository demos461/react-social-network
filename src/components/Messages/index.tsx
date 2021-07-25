import React from "react";
import styles from "../../styles/Messages.module.css";
import Dialog from "./Dialog";
import Message from "./Message";

const Messages: React.FC = () => {
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogItems}>
        <Dialog name={"Ilya"} id={1} />
        <Dialog name={"Oleg"} id={2} />
        <Dialog name={"Mihail"} id={4} />
        <Dialog name={"Andrey"} id={5} />
        <Dialog name={"Evgeniy"} id={6} />
      </div>
      <div className={styles.messages}>
        <Message message={"Hello World!"} />
        <Message message={"How are you?"} />
        <Message message={"I am fine, thank you"} />
      </div>
    </div>
  );
};

export default Messages;
