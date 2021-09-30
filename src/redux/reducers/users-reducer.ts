enum ACTION_TYPE {
    FOLLOW_USER = 'FOLLOW_USER',
    UNFOLLOW_USER = 'UNFOLLOW_USER',
    SET_USERS = 'SET_USERS',
    SET_TOTAL_USERS_COUNT = 'SET_TOTAL_COUNT',
    CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE',
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
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
}


const initialState: UsersStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
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
        default:
            return state


    }
}

type ActionsType =
    ReturnType<typeof follow> |
    ReturnType<typeof unfollow> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof changeCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleIsFetching>

export const follow = (userId: number) => {
    return {
        type: ACTION_TYPE.FOLLOW_USER,
        userId,
    } as const
}

export const unfollow = (userId: number) => {
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