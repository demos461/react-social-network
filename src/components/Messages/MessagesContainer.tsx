import React from 'react';
import {
    DialogType, MessagesStateType,
    MessageType,
    sendMessage,
    updateNewMessageBody
} from '../../redux/reducers/messages-reducer';
import Messages from './Messages';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../redux/store';

type MessagesContainerProps = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageBody: string
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
};

const MessagesContainer: React.FC<MessagesContainerProps> = ({
                                                                 dialogs,
                                                                 messages,
                                                                 newMessageBody,
                                                                 updateNewMessageBody,
                                                                 sendMessage
                                                             }) => {

    const onChangeMessage = (text: string) => {
        updateNewMessageBody(text)
    }

    const onSendMessage = () => {
        sendMessage()
    }

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


const mapStateToProps = (state: AppRootStateType): MessagesStateType => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        newMessageBody: state.messagesPage.newMessageBody
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: () => dispatch(sendMessage()),
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBody(body)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
