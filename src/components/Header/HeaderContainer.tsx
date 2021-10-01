import React, {Component} from 'react';
import Header from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {setAuthUser} from '../../redux/reducers/auth-reducer';

type HeaderContainerProps = {
    isAuth: boolean
    login: string
    setAuthUser: (id: number, login: string, email: string) => void
}

class HeaderContainer extends Component<HeaderContainerProps> {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true
            }).then(res => {
            let {id, login, email} = res.data.data
            if (res.data.resultCode === 0) this.props.setAuthUser(id, login, email)
        })
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

// @ts-ignore
export default connect(mapStateToProps, {setAuthUser})(HeaderContainer);