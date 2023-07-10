import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fb1b255d-daf2-447b-9658-1df546c81b09'
    }
});

//api
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 5) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
    },
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    }
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<GetUserProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status})
    },
    savePhoto(image: File) {
        const formData = new FormData()
        formData.append('image', image)
        return instance.put<ResponseType<PhotosType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateUserProfile(profile: UpdateUserProfileType) {
        return instance.put<ResponseType<{ url: string }>>('profile', profile)
    },
    getFriends() {
        return instance.get<GetUsersType>('users?page=1&count=4&friend=true')
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<string>('security/get-captcha-url')
    },
}

//types
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type MeType = {
    id: number
    email: string
    login: string
}

type PhotosType = {
    photos: {
        small: string
        large: string
    }
}

type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
}

type GetUsersType = {
    items: UserType[]
    totalCount: number
    error: string
}

type GetUserProfileType = {
    userId: number
    aboutMe: string
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

export type UpdateUserProfileType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription?: string
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
}






