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
    getUserProfile: (userId: number) => instance.get(`profile/${userId}`).then(res => res.data),
    follow: (userId: number) => instance.post(`follow/${userId}`).then(res => res.data),
    unfollow: (userId: number) => instance.delete(`follow/${userId}`).then(res => res.data),
}

export const authAPI = {
    getAuthUser: () => instance.get(`auth/me`).then(res => res.data)
}

