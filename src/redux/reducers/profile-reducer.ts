import {ProfilePageType} from '../store';

enum ACTION_TYPE {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT',
}


export const profileReducer = (state: ProfilePageType, action: ProfileActionsType) : ProfilePageType => {
    switch (action.type) {
        case ACTION_TYPE.ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
            }
            state.posts.push(newPost)
            state.newPostText = '';
            return state
        }
        case ACTION_TYPE.UPDATE_NEW_POST_TEXT: {
            state.newPostText = action.newText
            return state
        }
        default:
            return state
    }
}

export type ProfileActionsType = AddPostType | UpdateNewPostTextType

export type AddPostType = ReturnType<typeof addPost>
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostText>



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