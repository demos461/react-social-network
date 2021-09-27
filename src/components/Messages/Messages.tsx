import React from 'react';
import styles from '../../styles/Messages.module.css';
import Dialog from './Dialog';
import Message from './Message';
import s from '../../styles/Messages.module.css'
import {ActionsTypes, MessagePageType} from '../../redux/store';
import {sendMessage, updateNewMessageBody} from '../../redux/reducers/messages-reducer';

type MessagesProps = {
    messagesPage: MessagePageType
    dispatch: (action: ActionsTypes) => void
};

const Messages: React.FC<MessagesProps> = ({messagesPage, dispatch}) => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogItems}>
                {messagesPage.dialogs &&
                messagesPage.dialogs.map((d) => <Dialog key={d.id} name={d.name} id={d.id}/>)}
            </div>
            <div className={styles.messages}>
                {messagesPage.messages &&
                messagesPage.messages.map((m) => <Message key={m.id} message={m.message}/>)}
                <textarea
                    className={s.textarea}
                    value={messagesPage.newMessageBody}
                    onChange={(e) => dispatch(updateNewMessageBody(e.currentTarget.value))}
                />
                <div className={s.btn} onClick={() => dispatch(sendMessage())}>Send</div>
            </div>
        </div>
    );
};

export default Messages;
