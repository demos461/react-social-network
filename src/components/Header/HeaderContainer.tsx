import React, {Component} from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {logout} from '../../redux/reducers/auth-reducer';

type HeaderContainerProps = {
    isAuth: boolean
    login: string
    logout: () => void
}

class HeaderContainer extends Component<HeaderContainerProps> {

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}


export default connect(mapStateToProps, {logout})(HeaderContainer);