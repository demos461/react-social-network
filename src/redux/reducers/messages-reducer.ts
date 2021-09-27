import {MessagePageType} from '../store';

enum ACTION_TYPE {
    SEND_MESSAGE = 'SEND_MESSAGE',
    UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY',
}


export const messagesReducer = (state: MessagePageType, action: MessagesActionsType): MessagePageType => {
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