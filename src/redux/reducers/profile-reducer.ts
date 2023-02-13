import { Dispatch } from 'redux';
import { profileAPI, UpdateUserProfileType } from '../../api/API';
import { ThunkDispatch } from 'redux-thunk';
import { AppRootStateType } from '../store';

enum ACTION_TYPE {
  SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE',
  SET_STATUS = 'PROFILE/SET_STATUS',
  UPDATE_USER_PHOTO = 'PROFILE/UPDATE_USER_PHOTO',
}

export type PostType = {
  id: number;
  message: string;
};

export type UserProfileType = {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: {
    small: string | null;
    large: string | null;
  };
};

export type ProfileStateType = {
  profile: UserProfileType;
  status: string;
};

const initialState: ProfileStateType = {
  profile: {
    aboutMe: '',
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

  status: '',
};

export const profileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionsType,
): ProfileStateType => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPE.SET_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPE.UPDATE_USER_PHOTO:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: {
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export type ProfileActionsType =
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setUserStatus>
  | ReturnType<typeof updateUserPhoto>;

export const setUserProfile = (profile: UserProfileType) => {
  return {
    type: ACTION_TYPE.SET_USER_PROFILE,
    payload: {
      profile,
    },
  } as const;
};

export const setUserStatus = (status: string) => {
  return {
    type: ACTION_TYPE.SET_STATUS,
    payload: {
      status,
    },
  } as const;
};

export const updateUserPhoto = (small: string, large: string) => {
  return {
    type: ACTION_TYPE.UPDATE_USER_PHOTO,
    payload: {
      small,
      large,
    },
  } as const;
};

export const getUserProfile =
  (userId: number) => (dispatch: Dispatch<ProfileActionsType>) => {
    profileAPI.getUserProfile(userId).then(res => {
      dispatch(setUserProfile(res.data));
    });
  };

export const getUserStatus =
  (userId: number) => (dispatch: Dispatch<ProfileActionsType>) => {
    profileAPI.getStatus(userId).then(res => {
      dispatch(setUserStatus(res.data));
    });
  };

export const updateUserStatus =
  (status: string) => (dispatch: Dispatch<ProfileActionsType>) => {
    profileAPI.updateStatus(status).then(res => {
      if (res.data.resultCode === 0) dispatch(setUserStatus(status));
    });
  };

export const savePhoto = (image: File) => (dispatch: Dispatch<ProfileActionsType>) => {
  profileAPI.savePhoto(image).then(res => {
    if (res.data.resultCode === 0)
      dispatch(updateUserPhoto(res.data.data.photos.small, res.data.data.photos.large));
  });
};

export const updateUserProfile =
  (profile: UpdateUserProfileType) =>
  (
    dispatch: ThunkDispatch<AppRootStateType, undefined, ProfileActionsType>,
    getState: () => AppRootStateType,
  ) => {
    const userId = getState().auth.id;
    profileAPI.updateUserProfile(profile).then(res => {
      if (res.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
      }
    });
  };
