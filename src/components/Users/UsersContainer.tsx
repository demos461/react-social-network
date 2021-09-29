import React, {FC} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {AppRootStateType} from '../../redux/store';
import {follow, setUsers, unfollow, UsersStateType, UserType} from '../../redux/reducers/users-reducer';
import {Dispatch} from 'redux';

type UsersContainerProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    users: UserType[]
}

const UsersContainer: FC<UsersContainerProps> = ({users, setUsers, unfollow, follow}) => {


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
};


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