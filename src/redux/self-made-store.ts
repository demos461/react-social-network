import {MessagesActionsType, messagesReducer} from './reducers/messages-reducer';
import {ProfileActionsType, profileReducer} from './reducers/profile-reducer';

export type PostType = {
    id: number;
    message: string;
};

export type DialogType = {
    id: number;
    name: string;
};

export type MessageType = {
    id: number;
    message: string;
};

export type ProfilePageType = {
    posts: Array<PostType>;
    newPostText: string;
};

export type MessagePageType = {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
    newMessageBody: string;
};

export type RootStateType = {
    ProfilePage: ProfilePageType;
    MessagesPage: MessagePageType;
};

export  type RootStoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    getState: () => RootStateType
    subscribe: (observer: any) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = MessagesActionsType | ProfileActionsType

export let selfMadeStore: RootStoreType = {
    _state: {
        ProfilePage: {
            posts: [
                {id: 1, message: 'Hello World!'},
                {id: 2, message: '=^.^='},
                {id: 3, message: 'Cat)0))'},
            ],
            newPostText: '',
        },
        MessagesPage: {
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
        },
    },
    _callSubscriber() {
        console.log('State changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        // @ts-ignore
        this._state.MessagesPage = messagesReducer(this._state.MessagesPage, action)
        // @ts-ignore
        this._state.ProfilePage = profileReducer(this._state.ProfilePage, action)
        this._callSubscriber()

    }
}



