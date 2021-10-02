import {usersAPI} from '../../api/API';
import {Dispatch} from 'redux';

enum ACTION_TYPE {
    FOLLOW_USER = 'FOLLOW_USER',
    UNFOLLOW_USER = 'UNFOLLOW_USER',
    SET_USERS = 'SET_USERS',
    SET_TOTAL_USERS_COUNT = 'SET_TOTAL_COUNT',
    CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE',
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS',
}


export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | undefined
    followed: boolean
    photos: {
        small: string | undefined
        large: string | undefined
    }
    status: string | null
}


export type UsersStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}


const initialState: UsersStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}


export const usersReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case ACTION_TYPE.FOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        }
        case ACTION_TYPE.UNFOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        }
        case ACTION_TYPE.SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case ACTION_TYPE.SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        }
        case ACTION_TYPE.CHANGE_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case ACTION_TYPE.TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case ACTION_TYPE.TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state


    }
}

type ActionsType =
    ReturnType<typeof followSuccess> |
    ReturnType<typeof unfollowSuccess> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof changeCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleIsFetching> |
    ReturnType<typeof toggleFollowingInProgress>

export const followSuccess = (userId: number) => {
    return {
        type: ACTION_TYPE.FOLLOW_USER,
        userId,
    } as const
}

export const unfollowSuccess = (userId: number) => {
    return {
        type: ACTION_TYPE.UNFOLLOW_USER,
        userId,
    } as const
}

export const setUsers = (users: UserType[]) => {
    return {
        type: ACTION_TYPE.SET_USERS,
        users,
    } as const
}

export const setTotalUsersCount = (usersCount: number) => {
    return {
        type: ACTION_TYPE.SET_TOTAL_USERS_COUNT,
        usersCount,
    } as const
}

export const changeCurrentPage = (page: number) => {
    return {
        type: ACTION_TYPE.CHANGE_CURRENT_PAGE,
        page,
    } as const
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: ACTION_TYPE.TOGGLE_IS_FETCHING,
        isFetching,
    } as const
}

export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => {
    return {
        type: ACTION_TYPE.TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId,
    } as const
}

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize).then(data => {
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(toggleIsFetching(false))
    })
}

export const follow = (userId: number) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(toggleFollowingInProgress(true, userId))
    usersAPI.follow(userId).then(data => {
        if (data.resultCode === 0) dispatch(followSuccess(userId))
        dispatch(toggleFollowingInProgress(false, userId))
    })
}

export const unfollow = (userId: number) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(toggleFollowingInProgress(true, userId))
    usersAPI.unfollow(userId).then(data => {
        if (data.resultCode === 0) dispatch(unfollowSuccess(userId))
        dispatch(toggleFollowingInProgress(false, userId))
    })
}