import {Dispatch} from 'redux';
import {authAPI, securityAPI} from '../../api/API';
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store";

enum ACTION_TYPE {
    SET_AUTH_USER = 'AUTH/SET_AUTH_USER',
    GET_CAPTCHA_URL = 'AUTH/GET_CAPTCHA_URL',
}

export type AuthStateType = {
    id: number
    login: string
    email: string
    isAuth: boolean
    captchaUrl: string
}

const initialState: AuthStateType = {
    id: 0,
    login: '',
    email: '',
    isAuth: false,
    captchaUrl: ''
}


export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case ACTION_TYPE.SET_AUTH_USER:
            return {
                ...state,
                ...action.payload,
            }
        case ACTION_TYPE.GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state


    }
}

type AuthActionsType = ReturnType<typeof setAuthUser> | ReturnType<typeof getCaptchaUrlSuccess>

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

export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    return {
        type: ACTION_TYPE.GET_CAPTCHA_URL,
        payload: {
            captchaUrl
        },
    } as const
}

export const getAuthUser = () => (dispatch: Dispatch<AuthActionsType>) => {
    return authAPI.me().then(res => {
        let {id, login, email} = res.data.data
        if (res.data.resultCode === 0) dispatch(setAuthUser(id, login, email, true))
    })
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => (dispatch: ThunkDispatch<AppRootStateType, undefined, AuthActionsType>) => {
    authAPI.login(email, password, rememberMe, captcha).then(res => {
        if (res.data.resultCode === 0) dispatch(getAuthUser())
        if (res.data.resultCode === 10) dispatch(getCaptchaUrl())
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

export const getCaptchaUrl = () => (dispatch: Dispatch<AuthActionsType>) => {
    return securityAPI.getCaptchaUrl().then(res => {
        //@ts-ignore
        const captcha = res.data.url
        dispatch(getCaptchaUrlSuccess(captcha))
    })
}
