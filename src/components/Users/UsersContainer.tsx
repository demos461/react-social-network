import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {AppRootStateType} from '../../redux/store';
import {
    changeCurrentPage,
    follow, setTotalUsersCount,
    setUsers,
    unfollow,
    UsersStateType,
    UserType
} from '../../redux/reducers/users-reducer';
import {Dispatch} from 'redux';
import axios from 'axios';

type UsersContainerProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    users: UserType[]
    totalUsersCount: number
    pageSize: number,
    currentPage: number,
    changeCurrentPage: (page: number) => void
    setTotalUsersCount: (usersCount: number) => void
}

class UsersContainer extends React.Component<UsersContainerProps> {

    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(res => {
                this.props.setUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalCount)
            })
        }
    }

    onPageChanged = (pageNumber: number) => {
        this.props.changeCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(res => {
            this.props.setUsers(res.data.items)
        })
    }


    render() {
        let {users, unfollow, follow, totalUsersCount, pageSize, currentPage} = this.props;

        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

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
                pages={pages}
                currentPage={currentPage}
                onPageChanged={this.onPageChanged}
            />
        );
    }
}


const mapStateToProps = (state: AppRootStateType): UsersStateType => {
    return {
        users: state.users.users,
        totalUsersCount: state.users.totalUsersCount,
        pageSize: state.users.pageSize,
        currentPage: state.users.currentPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (userId: number) => dispatch(follow(userId)),
        unfollow: (userId: number) => dispatch(unfollow(userId)),
        setUsers: (users: UserType[]) => dispatch(setUsers(users)),
        changeCurrentPage: (page: number) => dispatch(changeCurrentPage(page)),
        setTotalUsersCount: (usersCount: number) => dispatch(setTotalUsersCount(usersCount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);