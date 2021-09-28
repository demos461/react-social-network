import React from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import MessagesContainer from './components/Messages/MessagesContainer';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import {ActionsTypes} from './redux/store';
import {AppRootStateType} from './redux/redux-store';

type AppProps = {
    state: AppRootStateType;
    dispatch: (action: ActionsTypes) => void
};

const App: React.FC<AppProps> = ({state, dispatch}) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-content-wrapper">
                <Route
                    path={'/profile'}
                    render={() => (
                        <Profile
                            profilePage={state.profilePage}
                            dispatch={dispatch}
                        />
                    )}
                />
                <Route
                    path={'/messages'}
                    render={() => (
                        <MessagesContainer
                            messagesPage={state.messagesPage}
                            dispatch={dispatch}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default App;
