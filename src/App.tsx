import React, {PureComponent} from 'react';
import './styles/App.css';
import Navbar from './components/Navbar/Navbar';
import MessagesContainer from './components/Messages/MessagesContainer';
import {Redirect, Route, Switch} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {initializeApp} from "./redux/reducers/app-reducer";
import {AppRootStateType} from "./redux/store";
import Preloader from "./components/Preloader/Preloader";
import Error404 from './components/Error404/Error404';


type AppPropsTypeType = {
    initialized: boolean
    initializeApp: () => void
}

class App extends PureComponent<AppPropsTypeType> {

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
                    <Switch>
                        <Route path={'/'} exact render={() => <Redirect to={'/profile'}/>}/>
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
                        <Route render={() => <Error404/>}/>
                    </Switch>
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
