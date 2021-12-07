import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {profileReducer} from './reducers/profile-reducer';
import {messagesReducer} from './reducers/messages-reducer';
import {usersReducer} from './reducers/users-reducer';
import {authReducer} from './reducers/auth-reducer';
import { appReducer } from './reducers/app-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    users: usersReducer,
    auth: authReducer,
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store