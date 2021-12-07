import React, {ComponentType, PureComponent} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {
    getUserProfile,
    getUserStatus,
    savePhoto,
    updateUserStatus,
    UserProfileType
} from '../../redux/reducers/profile-reducer';
import Preloader from '../Preloader/Preloader';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';

type PathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: UserProfileType,
    isAuth: boolean,
    status: string
    authUserId: number
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (image: File) => void
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType
type ProfileContainerProps = RouteComponentProps<PathParamsType> & PropsType

class ProfileContainer extends PureComponent<ProfileContainerProps> {

    refreshProfile() {
        let userId = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()

    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            this.props.profile.userId
                ? <Profile profile={this.props.profile}
                           status={this.props.status}
                           updateUserStatus={this.props.updateUserStatus}
                           isOwner={!this.props.match.params.userId}
                           savePhoto={this.props.savePhoto}
                />
                : <Preloader/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        authUserId: state.auth.id,
    }
}


export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus,savePhoto}),
    withRouter,
)(ProfileContainer)