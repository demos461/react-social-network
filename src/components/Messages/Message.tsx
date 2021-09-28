import React from 'react';
import styles from '../../styles/Messages.module.css';

type MessageProps = {
    message: string;
};

const Message: React.FC<MessageProps> = ({message}) => {
    return <div className={styles.message}>
        <div className={styles.message_body}>
            <div className={styles.message_author}>Ilya</div>
            <div className={styles.message_text}>{message}</div>
            <div className={styles.message_time}>4:20</div>
        </div>
        <div className={styles.message_avatar}>
            <img src={'https://cdn1.flamp.ru/96a74d31e6bd619a8f381c27ef308a76.png'} alt={'avatar'}/>
        </div>
    </div>
};

export default Message;
