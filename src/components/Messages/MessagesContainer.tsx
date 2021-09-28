import React from 'react';
import {MessagePageType} from '../../redux/self-made-store';
import {sendMessage, updateNewMessageBody} from '../../redux/reducers/messages-reducer';
import Messages from './Messages';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../redux/store';

type MessagesContainerProps = {
    messagesPage: MessagePageType
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
};

const MessagesContainer: React.FC<MessagesContainerProps> = ({messagesPage, updateNewMessageBody, sendMessage}) => {

    const onChangeMessage = (text: string) => {
        updateNewMessageBody(text)
    }

    const onSendMessage = () => {
        sendMessage()
    }

    return (
        <Messages
            messagesPage={messagesPage}
            updateNewMessageBody={onChangeMessage}
            sendMessage={onSendMessage}
        />
    );
};


const mapStateToProps = (state: AppRootStateType) => {
    return {
        messagesPage: state.messagesPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: () => dispatch(sendMessage()),
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBody(body)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
