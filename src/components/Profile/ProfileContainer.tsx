import React, {Component} from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {setUserProfile, UserProfileType} from '../../redux/reducers/profile-reducer';

type ProfileContainerProps = {
    setUserProfile: (userProfile: UserProfileType) => void
    profile: UserProfileType
}

class ProfileContainer extends Component<ProfileContainerProps> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/2').then((res) => {
            this.props.setUserProfile(res.data)
        })
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        profile: state.profilePage.profile
    }
}

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);