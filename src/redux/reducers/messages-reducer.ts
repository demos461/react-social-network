enum ACTION_TYPE {
    SEND_MESSAGE = 'SEND_MESSAGE',
    UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY',
}

export type DialogType = {
    id: number;
    name: string;
};

export type MessageType = {
    id: number;
    message: string;
};

export type MessagesStateType = {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
    newMessageBody: string;
};


const initialState: MessagesStateType = {
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


export const messagesReducer = (state: MessagesStateType = initialState, action: MessagesActionsType): MessagesStateType => {
    switch (action.type) {
        case ACTION_TYPE.SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: state.newMessageBody}],
                newMessageBody: ''
            }
        case ACTION_TYPE.UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export type MessagesActionsType = ReturnType<typeof sendMessage> | ReturnType<typeof updateNewMessageBody>

export const sendMessage = () => {
    return {
        type: ACTION_TYPE.SEND_MESSAGE,
    } as const
}

export const updateNewMessageBody = (newMessageBody: string) => {
    return {
        type: ACTION_TYPE.UPDATE_NEW_MESSAGE_BODY,
        payload: {
            newMessageBody,
        },
    } as const
}