import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar/Navbar';
import MessagesContainer from './components/Messages/MessagesContainer';
import {Route} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {Component} from 'react';
import {initializeApp} from "./redux/reducers/app-reducer";
import {AppRootStateType} from "./redux/store";
import Preloader from "./components/Preloader/Preloader";


type AppPropsType = {
    initialized: boolean
    initializeApp: () => void
}

class App extends Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
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
    }
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, {initializeApp})(App);
