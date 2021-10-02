import React from 'react';
import {
    DialogType,
    MessageType,
    sendMessage,
    updateNewMessageBody
} from '../../redux/reducers/messages-reducer';
import Messages from './Messages';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../redux/store';
import {Redirect} from 'react-router-dom';

type MessagesContainerProps = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageBody: string
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
    isAuth: boolean
};

const MessagesContainer: React.FC<MessagesContainerProps> = ({
                                                                 dialogs,
                                                                 messages,
                                                                 newMessageBody,
                                                                 updateNewMessageBody,
                                                                 sendMessage,
                                                                 isAuth
                                                             }) => {

    const onChangeMessage = (text: string) => {
        updateNewMessageBody(text)
    }

    const onSendMessage = () => {
        sendMessage()
    }

    if (!isAuth) return <Redirect to={'/login'}/>

    return (
        <Messages
            dialogs={dialogs}
            messages={messages}
            newMessageBody={newMessageBody}
            updateNewMessageBody={onChangeMessage}
            sendMessage={onSendMessage}
        />
    );
};


const mapStateToProps = (state: AppRootStateType) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        newMessageBody: state.messagesPage.newMessageBody,
        isAuth: state.auth.isAuth

    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: () => dispatch(sendMessage()),
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBody(body)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
