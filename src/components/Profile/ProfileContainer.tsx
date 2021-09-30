import React, {Component} from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {setUserProfile, UserProfileType} from '../../redux/reducers/profile-reducer';
import Preloader from '../Preloader/Preloader';
import {RouteComponentProps, withRouter} from 'react-router-dom';

type PathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: UserProfileType
}

type MapDispatchToPropsType = {
    setUserProfile: (userProfile: UserProfileType) => void
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType
type ProfileContainerProps = RouteComponentProps<PathParamsType> & PropsType

class ProfileContainer extends Component<ProfileContainerProps> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = '19600'
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then((res) => {
            this.props.setUserProfile(res.data)
        })
    }

    render() {
        return (
            this.props.profile
                ? <Profile profile={this.props.profile}/>
                : <Preloader/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

const ProfileContainerWithRouter = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(ProfileContainerWithRouter);