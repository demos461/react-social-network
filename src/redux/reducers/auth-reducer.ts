import {Dispatch} from 'redux';
import {authAPI} from '../../api/API';

enum ACTION_TYPE {
    SET_AUTH_USER = 'SET_AUTH_USER'
}

export type AuthStateType = {
    id: number
    login: string
    email: string
    isAuth: boolean
}

const initialState = {
    id: 0,
    login: '',
    email: '',
    isAuth: false,
}


export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case ACTION_TYPE.SET_AUTH_USER:
            return {
                id: action.id,
                login: action.login,
                email: action.email,
                isAuth: true,
            }
        default:
            return state


    }
}

type AuthActionsType = ReturnType<typeof setAuthUser>

export const setAuthUser = (id: number, login: string, email: string) => {
    return {
        type: ACTION_TYPE.SET_AUTH_USER,
        id, login, email,
    } as const
}

export const getAuthUser = () => (dispatch: Dispatch<AuthActionsType>) => {
    authAPI.getAuthUser().then(data => {
        let {id, login, email} = data.data
        if (data.resultCode === 0) dispatch(setAuthUser(id, login, email))
    })
}