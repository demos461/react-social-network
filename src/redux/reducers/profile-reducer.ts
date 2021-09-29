enum ACTION_TYPE {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT',
}

export type PostType = {
    id: number;
    message: string;
};

export type ProfileStateType = {
    posts: Array<PostType>;
    newPostText: string;
};


const initialState = {
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