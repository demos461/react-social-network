import React from 'react';
import {ActionsTypes, MessagePageType} from '../../redux/store';
import {sendMessage, updateNewMessageBody} from '../../redux/reducers/messages-reducer';
import Messages from './Messages';

type MessagesContainerProps = {
    messagesPage: MessagePageType
    dispatch: (action: ActionsTypes) => void
};

const MessagesContainer: React.FC<MessagesContainerProps> = ({messagesPage, dispatch}) => {

    const onChangeMessage = (text: string) => {
        dispatch(updateNewMessageBody(text))
    }

    const onSendMessage = () => {
        dispatch(sendMessage())
    }

    return (
        <Messages
            messagesPage={messagesPage}
            updateNewMessageBody={onChangeMessage}
            sendMessage={onSendMessage}
        />
    );
};

export default MessagesContainer;
