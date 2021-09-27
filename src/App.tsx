import React from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Messages from './components/Messages/Messages';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import {ActionsTypes, RootStateType} from './redux/store';

type AppProps = {
    state: RootStateType;
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
                            profilePage={state.ProfilePage}
                            dispatch={dispatch}
                        />
                    )}
                />
                <Route
                    path={'/messages'}
                    render={() => (
                        <Messages
                            messagesPage={state.MessagesPage}
                            dispatch={dispatch}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default App;
