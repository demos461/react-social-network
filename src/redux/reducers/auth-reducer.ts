import {Dispatch} from 'redux';
import {authAPI} from '../../api/API';

enum ACTION_TYPE {
    SET_AUTH_USER = 'SET_AUTH_USER',
    SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN'
}

export type AuthStateType = {
    id: number
    login: string
    email: string
    isAuth: boolean
}

const initialState: AuthStateType = {
    id: 0,
    login: '',
    email: '',
    isAuth: false,
}


export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case ACTION_TYPE.SET_AUTH_USER:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            }
        case ACTION_TYPE.SET_IS_LOGGED_IN:
            return {
                ...state,
                ...action.payload

            }
        default:
            return state


    }
}

type AuthActionsType = ReturnType<typeof setAuthUser> | ReturnType<typeof setIsLoggedIn>

export const setAuthUser = (id: number, login: string, email: string) => {
    return {
        type: ACTION_TYPE.SET_AUTH_USER,
        payload: {
            id,
            login,
            email,
        },
    } as const
}

export const setIsLoggedIn = (isAuth: boolean) => {
    return {
        type: ACTION_TYPE.SET_IS_LOGGED_IN,
        payload: {
            isAuth
        }
    } as const
}

export const getAuthUser = () => (dispatch: Dispatch<AuthActionsType>) => {
    authAPI.me().then(data => {
        let {id, login, email} = data.data
        if (data.resultCode === 0) dispatch(setAuthUser(id, login, email))
    })
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe, captcha).then(res => {
        if (res.data.resultCode === 0) dispatch(setIsLoggedIn(true))
    })
}

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) dispatch(setIsLoggedIn(false))
        })
}
