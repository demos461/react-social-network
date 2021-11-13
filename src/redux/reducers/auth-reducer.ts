import {Dispatch} from 'redux';
import {authAPI} from '../../api/API';

enum ACTION_TYPE {
    SET_AUTH_USER = 'SET_AUTH_USER',
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
                ...action.payload,
            }
        default:
            return state


    }
}

type AuthActionsType = ReturnType<typeof setAuthUser>

export const setAuthUser = (id: number, login: string, email: string, isAuth: boolean) => {
    return {
        type: ACTION_TYPE.SET_AUTH_USER,
        payload: {
            id,
            login,
            email,
            isAuth
        },
    } as const
}

export const getAuthUser = () => (dispatch: Dispatch<AuthActionsType>) => {
    return authAPI.me().then(res => {
        let {id, login, email} = res.data.data
        if (res.data.resultCode === 0) dispatch(setAuthUser(id, login, email, true))
    })
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean) => (dispatch: Dispatch<any>) => {
    authAPI.login(email, password, rememberMe, captcha).then(res => {
        if (res.data.resultCode === 0) dispatch(getAuthUser())
    })
}

export const logout = () => (dispatch: Dispatch<AuthActionsType>) => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUser(0, '', '', false))
            }
        })
}
