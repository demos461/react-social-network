import React, {Component, ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {getUserProfile, getUserStatus, updateUserStatus, UserProfileType} from '../../redux/reducers/profile-reducer';
import Preloader from '../Preloader/Preloader';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

type PathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: UserProfileType,
    isAuth: boolean,
    status: string
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType
type ProfileContainerProps = RouteComponentProps<PathParamsType> & PropsType

class ProfileContainer extends Component<ProfileContainerProps> {
    componentDidMount() {
        let userId = +this.props.match.params.userId
        if (!userId) userId = 19600
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)

    }


    render() {
        return (
            this.props.profile.userId
                ? <Profile profile={this.props.profile} status={this.props.status}
                           updateUserStatus={this.props.updateUserStatus}/>
                : <Preloader/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status
    }
}


export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)