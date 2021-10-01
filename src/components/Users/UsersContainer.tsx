import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {AppRootStateType} from '../../redux/store';
import {
    changeCurrentPage,
    follow, setTotalUsersCount,
    setUsers, toggleIsFetching,
    unfollow,
    UsersStateType,
    UserType
} from '../../redux/reducers/users-reducer';
import Preloader from '../Preloader/Preloader';
import {usersAPI} from '../../api/API';

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
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
}

class UsersContainer extends React.Component<UsersContainerProps> {

    componentDidMount() {
        if (this.props.users.length === 0) {
            usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
        }
    }

    onPageChanged = (pageNumber: number) => {
        this.props.changeCurrentPage(pageNumber)
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.setUsers(data.items)
            this.props.toggleIsFetching(false);
        })
    }


    render() {
        let {users, unfollow, follow, totalUsersCount, pageSize, currentPage, isFetching} = this.props;

        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        const followOnClick = (userId: number) => {
            usersAPI.follow(userId).then(data => {
                if (data.resultCode === 0) follow(userId)
            })
        }

        const unfollowOnClick = (userId: number) => {
            usersAPI.unfollow(userId).then(data => {
                if (data.resultCode === 0) unfollow(userId)
            })
        }

        return (
            <>
                {isFetching && <Preloader/>}
                <Users
                    users={users}
                    follow={followOnClick}
                    unfollow={unfollowOnClick}
                    pages={pages}
                    currentPage={currentPage}
                    onPageChanged={this.onPageChanged}
                />
            </>

        )
    }
}


const mapStateToProps = (state: AppRootStateType): UsersStateType => {
    return {
        users: state.users.users,
        totalUsersCount: state.users.totalUsersCount,
        pageSize: state.users.pageSize,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching
    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    changeCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(UsersContainer);