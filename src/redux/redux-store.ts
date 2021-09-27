import {combineReducers, createStore} from 'redux';
import {profileReducer} from './reducers/profile-reducer';
import {messagesReducer} from './reducers/messages-reducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>
