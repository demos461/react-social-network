import {MessagePageType} from '../store';

enum ACTION_TYPE {
    SEND_MESSAGE = 'SEND_MESSAGE',
    UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY',
}

const initialState = {
    dialogs: [
        {id: 1, name: 'Ilya'},
        {id: 2, name: 'Oleg'},
        {id: 3, name: 'Mihail'},
        {id: 4, name: 'Andrey'},
        {id: 5, name: 'Evgeniy'},
    ],
    messages: [
        {id: 1, message: 'Hello world!'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'I am fine, thank you'},
    ],
    newMessageBody: '',
}


export const messagesReducer = (state: MessagePageType = initialState, action: MessagesActionsType): MessagePageType => {
    switch (action.type) {
        case ACTION_TYPE.SEND_MESSAGE: {
            let newMessageBody = state.newMessageBody
            state.messages.push({id: 6, message: newMessageBody})
            state.newMessageBody = '';
            return state
        }
        case ACTION_TYPE.UPDATE_NEW_MESSAGE_BODY: {
            state.newMessageBody = action.body
            return state
        }
        default:
            return state
    }
}

export type MessagesActionsType = SendMessageType | UpdateNewMessageBodyType
export type SendMessageType = ReturnType<typeof sendMessage>
export type UpdateNewMessageBodyType = ReturnType<typeof updateNewMessageBody>

export const sendMessage = () => {
    return {
        type: ACTION_TYPE.SEND_MESSAGE
    } as const
}

export const updateNewMessageBody = (body: string) => {
    return {
        type: ACTION_TYPE.UPDATE_NEW_MESSAGE_BODY,
        body,
    } as const
}