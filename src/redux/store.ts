import {combineReducers, createStore} from 'redux';
import {profileReducer} from './reducers/profile-reducer';
import {messagesReducer} from './reducers/messages-reducer';
import {usersReducer} from './reducers/users-reducer';
import {authReducer} from './reducers/auth-reducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    users: usersReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store