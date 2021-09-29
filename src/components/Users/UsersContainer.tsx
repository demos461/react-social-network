import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {AppRootStateType} from '../../redux/store';
import {follow, setUsers, unfollow, UsersStateType, UserType} from '../../redux/reducers/users-reducer';
import {Dispatch} from 'redux';
import axios from 'axios';

type UsersContainerProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    users: UserType[]
}

class UsersContainer extends React.Component<UsersContainerProps> {

    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(res => {
                this.props.setUsers(res.data.items)
            })
        }
    }


    render() {
        let {users, unfollow, follow} = this.props;

        const followOnClick = (userId: number) => {
            follow(userId)
        }

        const unfollowOnClick = (userId: number) => {
            unfollow(userId)
        }

        return (
            <Users
                users={users}
                follow={followOnClick}
                unfollow={unfollowOnClick}
            />
        );
    }
}


const mapStateToProps = (state: AppRootStateType): UsersStateType => {
    return {
        users: state.users.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (userId: number) => dispatch(follow(userId)),
        unfollow: (userId: number) => dispatch(unfollow(userId)),
        setUsers: (users: UserType[]) => dispatch(setUsers(users))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);