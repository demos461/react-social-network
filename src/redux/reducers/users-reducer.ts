enum ACTION_TYPE {
    FOLLOW_USER = 'FOLLOW_USER',
    UNFOLLOW_USER = 'UNFOLLOW_USER',
    SET_USERS = 'SET_USERS'
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
}


const initialState = {
    users: []
}


export const usersReducer = (state: UsersStateType = initialState, action: ActionsType) => {
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
                users: [...state.users, ...action.users]
            }
        }
        default:
            return state


    }
}

type ActionsType =
    ReturnType<typeof follow> |
    ReturnType<typeof unfollow> |
    ReturnType<typeof setUsers>

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