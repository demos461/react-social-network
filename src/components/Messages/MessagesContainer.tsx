import React, {ComponentType, FC, memo} from 'react';
import {
    DialogType,
    MessageType,
    sendMessage,
} from '../../redux/reducers/messages-reducer';
import Messages from './Messages';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {AppRootStateType} from '../../redux/store';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';

type MessagesContainerProps = {
    dialogs: DialogType[]
    messages: MessageType[]
    sendMessage: (message: string) => void
};

const MessagesContainer: FC<MessagesContainerProps> = memo(({dialogs, messages, sendMessage,}) => {

    return (
        <Messages
            dialogs={dialogs}
            messages={messages}
            sendMessage={sendMessage}
        />
    );
});


const mapStateToProps = (state: AppRootStateType) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
    }
}


export default compose<ComponentType>(
    connect(mapStateToProps, {sendMessage}),
    WithAuthRedirect
)(MessagesContainer)

