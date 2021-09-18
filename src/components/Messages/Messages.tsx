import React from "react";
import styles from "../../styles/Messages.module.css";
import Dialog from "./Dialog";
import Message from "./Message";
import { DialogType, MessageType } from "../../redux/state";

type MessagesProps = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
};

const Messages: React.FC<MessagesProps> = ({ dialogs, messages }) => {
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogItems}>
        {dialogs &&
          dialogs.map((d) => <Dialog key={d.id} name={d.name} id={d.id} />)}
      </div>
      <div className={styles.messages}>
        {messages &&
          messages.map((m) => <Message key={m.id} message={m.message} />)}
      </div>
    </div>
  );
};

export default Messages;
