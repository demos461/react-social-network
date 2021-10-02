import {Dispatch} from 'redux';
import {usersAPI} from '../../api/API';

enum ACTION_TYPE {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT',
    SET_USER_PROFILE = 'SET_USER_PROFILE'
}

export type PostType = {
    id: number;
    message: string;
};

export type UserProfileType = {
    aboutMe: string | undefined
    contacts: {
        facebook: string | undefined
        website: string | undefined
        vk: string | undefined
        twitter: string | undefined
        instagram: string | undefined
        youtube: string | undefined
        github: string | undefined
        mainLink: string | undefined
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string | undefined
    fullName: string | undefined
    userId: number
    photos: {
        small: string | undefined
        large: string | undefined
    }
}

export type ProfileStateType = {
    profile: UserProfileType
    posts: Array<PostType>;
    newPostText: string;
}


const initialState: ProfileStateType = {
    profile: {
        aboutMe: undefined,
        contacts: {
            facebook: undefined,
            website: undefined,
            vk: undefined,
            twitter: undefined,
            instagram: undefined,
            youtube: undefined,
            github: undefined,
            mainLink: undefined,
        },
        lookingForAJob: false,
        lookingForAJobDescription: undefined,
        fullName: undefined,
        userId: 0,
        photos: {
            small: undefined,
            large: undefined,
        },
    },
    posts: [
        {id: 1, message: 'Hello World!'},
        {id: 2, message: '=^.^='},
        {id: 3, message: 'Cat)0))'},
    ],
    newPostText: '',
}


export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case ACTION_TYPE.ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: state.newPostText}],
                newPostText: ''
            }
        }
        case ACTION_TYPE.UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case ACTION_TYPE.SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.userProfile
            }
        }
        default:
            return state
    }
}

export type ProfileActionsType =
    ReturnType<typeof addPost> |
    ReturnType<typeof updateNewPostText> |
    ReturnType<typeof setUserProfile>

export const addPost = () => {
    return {
        type: ACTION_TYPE.ADD_POST,
    } as const
}

export const updateNewPostText = (newText: string) => {
    return {
        type: ACTION_TYPE.UPDATE_NEW_POST_TEXT,
        newText,
    } as const
}

export const setUserProfile = (userProfile: UserProfileType) => {
    return {
        type: ACTION_TYPE.SET_USER_PROFILE,
        userProfile
    } as const
}


export const getUserProfile = (userId: number) => (dispatch: Dispatch<ProfileActionsType>) => {
    usersAPI.getUserProfile(userId).then(data => {
        dispatch(setUserProfile(data))
    })
}