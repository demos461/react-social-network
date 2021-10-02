import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {AppRootStateType} from '../../redux/store';
import {
    changeCurrentPage, follow,
    getUsers, setTotalUsersCount,
    unfollow,
    UserType
} from '../../redux/reducers/users-reducer';
import Preloader from '../Preloader/Preloader';
import {Redirect} from 'react-router-dom';

type UsersContainerProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    users: UserType[]
    totalUsersCount: number
    pageSize: number,
    currentPage: number,
    changeCurrentPage: (page: number) => void
    setTotalUsersCount: (usersCount: number) => void
    isFetching: boolean
    followingInProgress: number[]
    getUsers: (currentPage: number, pageSize: number) => void
    isAuth: boolean
}

class UsersContainer extends React.Component<UsersContainerProps> {

    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.getUsers(this.props.currentPage, this.props.pageSize)
        }
    }


    onPageChanged = (pageNumber: number) => {
        this.props.changeCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
    }


    render() {
        let {
            users,
            totalUsersCount,
            pageSize,
            currentPage,
            isFetching,
            followingInProgress,
            isAuth
        } = this.props;

        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        const followOnClick = (userId: number) => {
            this.props.follow(userId)
        }

        const unfollowOnClick = (userId: number) => {
            this.props.unfollow(userId)
        }

        if (!isAuth) return <Redirect to={'/login'}/>

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
                    followingInProgress={followingInProgress}
                />
            </>

        )
    }
}


const mapStateToProps = (state: AppRootStateType) => {
    return {
        users: state.users.users,
        totalUsersCount: state.users.totalUsersCount,
        pageSize: state.users.pageSize,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingInProgress: state.users.followingInProgress,
        isAuth: state.auth.isAuth

    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    changeCurrentPage,
    setTotalUsersCount,
    getUsers
})(UsersContainer);