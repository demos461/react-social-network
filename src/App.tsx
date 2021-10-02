import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar/Navbar';
import MessagesContainer from './components/Messages/MessagesContainer';
import {Route} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

const App: React.FC = () => {
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-content-wrapper">
                <Route
                    path={'/profile/:userId?'}
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
                <Route
                    path={'/login'}
                    render={() => <Login/>}
                />
            </div>
        </div>
    );
};

export default App;
