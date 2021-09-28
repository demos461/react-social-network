import React, {ChangeEvent} from 'react';
import styles from '../../styles/Messages.module.css';
import Dialog from './Dialog';
import Message from './Message';
import s from '../../styles/Messages.module.css';
import {MessagePageType} from '../../redux/self-made-store';


type MessagesProps = {
    messagesPage: MessagePageType
    updateNewMessageBody: (text: string) => void
    sendMessage: () => void
};

const Messages: React.FC<MessagesProps> = ({messagesPage, updateNewMessageBody, sendMessage}) => {

    const textareaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewMessageBody(e.currentTarget.value)
    }

    const sendMessageOnClick = () => {
        sendMessage()
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogItems}>
                {messagesPage.dialogs &&
                messagesPage.dialogs.map((d) => <Dialog key={d.id} name={d.name} id={d.id}/>)}
            </div>
            <div className={styles.messages}>
                {messagesPage.messages &&
                messagesPage.messages.map((m) => <Message key={m.id} message={m.message}/>)}
                <div className={s.inputForm}>
                    <textarea
                        className={s.textarea}
                        value={messagesPage.newMessageBody}
                        rows={5}
                        onChange={textareaOnChange}
                    />
                    <div className={s.btn} onClick={sendMessageOnClick}>Send</div>
                </div>

            </div>
        </div>
    );
};

export default Messages;