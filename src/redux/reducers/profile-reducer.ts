import {Dispatch} from 'redux';
import {profileAPI} from '../../api/API';

enum ACTION_TYPE {
    ADD_POST = 'ADD_POST',
    SET_USER_PROFILE = 'SET_USER_PROFILE',
    SET_STATUS = 'SET_STATUS',
}

export type PostType = {
    id: number;
    message: string;
};

export type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string | null
        large: string | null
    }
}

export type ProfileStateType = {
    profile: UserProfileType
    posts: Array<PostType>
    status: string
}


const initialState: ProfileStateType = {
    profile: {
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: 0,
        photos: {
            small: '',
            large: '',
        },
    },
    posts: [
        {id: 1, message: 'Hello World!'},
        {id: 2, message: '=^.^='},
        {id: 3, message: 'Cat)0))'},
    ],
    status: '',
}


export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case ACTION_TYPE.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, ...action.payload}],
            }
        case ACTION_TYPE.SET_USER_PROFILE:
            return {
                ...state,
                ...action.payload,
            }
        case ACTION_TYPE.SET_STATUS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export type ProfileActionsType =
    ReturnType<typeof addPost> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof setUserStatus>


export const addPost = (message: string) => {
    return {
        type: ACTION_TYPE.ADD_POST,
        payload: {
            message
        }
    } as const
}

export const setUserProfile = (profile: UserProfileType) => {
    return {
        type: ACTION_TYPE.SET_USER_PROFILE,
        payload: {
            profile,
        },
    } as const
}

export const setUserStatus = (status: string) => {
    return {
        type: ACTION_TYPE.SET_STATUS,
        payload: {
            status,
        },
    } as const
}


export const getUserProfile = (userId: number) => (dispatch: Dispatch<ProfileActionsType>) => {
    profileAPI.getUserProfile(userId).then(res => {
        dispatch(setUserProfile(res.data))
    })
}

export const getUserStatus = (userId: number) => (dispatch: Dispatch<ProfileActionsType>) => {
    profileAPI.getStatus(userId).then(res => {
        dispatch(setUserStatus(res.data))
    })
}

export const updateUserStatus = (status: string) => (dispatch: Dispatch<ProfileActionsType>) => {
    profileAPI.updateStatus(status).then(res => {
        if (res.data.resultCode === 0)
            dispatch(setUserStatus(status))
    })
}