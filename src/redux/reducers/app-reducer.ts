import {getAuthUser} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store";

enum ACTION_TYPE {
    INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
}

type AppStateType = {
    initialized: boolean
}

let initialState: AppStateType = {
    initialized: false
}

export const appReducer = (state = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case ACTION_TYPE.INITIALIZED_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

type AppActionsType = ReturnType<typeof initializedSuccess>


export const initializedSuccess = () => {
    return {
        type: ACTION_TYPE.INITIALIZED_SUCCESS,
        payload: {
            initialized: true
        } as const
    }
}


export const initializeApp = () => (dispatch: ThunkDispatch<AppRootStateType, undefined, AppActionsType>) => {
    const promise = dispatch(getAuthUser())
    promise.then(() => {
        dispatch(initializedSuccess())
    })

}
