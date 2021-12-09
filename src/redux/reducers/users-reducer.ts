import {usersAPI} from '../../api/API';
import {Dispatch} from 'redux';

enum ACTION_TYPE {
    FOLLOW_USER = 'USERS/FOLLOW_USER',
    UNFOLLOW_USER = 'USERS/UNFOLLOW_USER',
    SET_USERS = 'USERS/SET_USERS',
    SET_TOTAL_USERS_COUNT = 'USERS/SET_TOTAL_COUNT',
    CHANGE_CURRENT_PAGE = 'USERS/CHANGE_CURRENT_PAGE',
    TOGGLE_IS_FETCHING = 'USERS/TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
}


export type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
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


export const usersReducer = (state: UsersStateType = initialState, action: UsersActionsType): UsersStateType => {
    switch (action.type) {
        case ACTION_TYPE.FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)
            }
        case ACTION_TYPE.UNFOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)
            }
        }
        case ACTION_TYPE.SET_USERS: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case ACTION_TYPE.SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case ACTION_TYPE.CHANGE_CURRENT_PAGE: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case ACTION_TYPE.TOGGLE_IS_FETCHING: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case ACTION_TYPE.TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)
            }
        }
        default:
            return state


    }
}

type UsersActionsType =
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
        payload: {
            userId,
        }
    } as const
}

export const unfollowSuccess = (userId: number) => {
    return {
        type: ACTION_TYPE.UNFOLLOW_USER,
        payload: {
            userId,
        }
    } as const
}

export const setUsers = (users: UserType[]) => {
    return {
        type: ACTION_TYPE.SET_USERS,
        payload: {
            users,
        }
    } as const
}

export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: ACTION_TYPE.SET_TOTAL_USERS_COUNT,
        payload: {
            totalUsersCount,
        }
    } as const
}

export const changeCurrentPage = (currentPage: number) => {
    return {
        type: ACTION_TYPE.CHANGE_CURRENT_PAGE,
        payload: {
            currentPage,
        }
    } as const
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: ACTION_TYPE.TOGGLE_IS_FETCHING,
        payload: {
            isFetching,
        }
    } as const
}

export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => {
    return {
        type: ACTION_TYPE.TOGGLE_IS_FOLLOWING_PROGRESS,
        payload: {
            isFetching,
            userId,
        },
    } as const
}

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch<UsersActionsType>) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize).then(res => {
        dispatch(setUsers(res.data.items))
        dispatch(setTotalUsersCount(res.data.totalCount))
        dispatch(toggleIsFetching(false))
    })
}

export const follow = (userId: number) => (dispatch: Dispatch<UsersActionsType>) => {
    dispatch(toggleFollowingInProgress(true, userId))
    usersAPI.follow(userId).then(res => {
        if (res.data.resultCode === 0) dispatch(followSuccess(userId))
        dispatch(toggleFollowingInProgress(false, userId))
    })
}

export const unfollow = (userId: number) => (dispatch: Dispatch<UsersActionsType>) => {
    dispatch(toggleFollowingInProgress(true, userId))
    usersAPI.unfollow(userId).then(res => {
        if (res.data.resultCode === 0) dispatch(unfollowSuccess(userId))
        dispatch(toggleFollowingInProgress(false, userId))
    })
}