import React, {Component} from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {getAuthUser} from '../../redux/reducers/auth-reducer';

type HeaderContainerProps = {
    isAuth: boolean
    login: string
    getAuthUser: () => void
}

class HeaderContainer extends Component<HeaderContainerProps> {
    componentDidMount() {
        this.props.getAuthUser()
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login}/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}


export default connect(mapStateToProps, {getAuthUser})(HeaderContainer);