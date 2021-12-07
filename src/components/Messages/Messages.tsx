import React, { FC } from 'react';
import styles from '../../styles/Messages.module.css';
import Dialog from './Dialog';
import Message from './Message';
import s from '../../styles/Messages.module.css';
import {DialogType, MessageType} from '../../redux/reducers/messages-reducer';
import {useFormik} from "formik";
import { memo } from 'react';


type MessagesProps = {
    dialogs: DialogType[]
    messages: MessageType[]
    sendMessage: (message: string) => void
};

type FormikErrorType = {
    message?: string
}

const Messages: FC<MessagesProps> = memo(({dialogs, messages, sendMessage}) => {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.message) {
                errors.message = 'Required';
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            sendMessage(values.message)
        },
    })

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogItems}>
                {dialogs &&
                dialogs.map((d) => <Dialog key={d.id} name={d.name} id={d.id}/>)}
            </div>
            <div className={styles.messages}>
                {messages &&
                messages.map((m) => <Message key={m.id} message={m.message}/>)}
                <form className={s.inputForm} onSubmit={formik.handleSubmit}>
                    <textarea
                        className={s.textarea}
                        {...formik.getFieldProps('message')}
                        rows={5}
                    />
                    <button className={s.btn} type={'submit'}>Send</button>
                </form>

            </div>
        </div>
    );
});

export default Messages;