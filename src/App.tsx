import React from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import MessagesContainer from './components/Messages/MessagesContainer';
import {Route} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

const App: React.FC = () => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-content-wrapper">
                <Route
                    path={'/profile'}
                    render={() => <ProfileContainer/>}
                />
                <Route
                    path={'/messages'}
                    render={() => <MessagesContainer/>}
                />
                <Route
                    path={'/users'}
                    render={() => <UsersContainer/>}
                />
            </div>
        </div>
    );
};

export default App;
