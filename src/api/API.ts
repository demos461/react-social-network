import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fb1b255d-daf2-447b-9658-1df546c81b09'
    }
});


export const usersAPI = {
    getUsers: (currentPage: number = 1, pageSize: number = 5) => instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data),
    follow: (userId: number) => instance.post(`follow/${userId}`).then(res => res.data),
    unfollow: (userId: number) => instance.delete(`follow/${userId}`).then(res => res.data),
}

export const authAPI = {
    me: () => instance.get(`auth/me`).then(res => res.data),
    login: (email: string, password: string, rememberMe: boolean, captcha: boolean) => instance.post('auth/login', {
        email,
        password,
        rememberMe,
        captcha
    }),
    logout: () => instance.delete('auth/login')
}

export const profileAPI = {
    getUserProfile: (userId: number) => instance.get(`profile/${userId}`).then(res => res.data),
    getStatus: (userId: number) => instance.get(`profile/status/${userId}`).then(res => res.data),
    updateStatus: (status: string) => instance.put(`profile/status`, {status: status}),
}

