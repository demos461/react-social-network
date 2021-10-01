import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fb1b255d-daf2-447b-9658-1df546c81b09'
    }
});


export const usersAPI = {
    getUsers: (currentPage: number = 1, pageSize: number = 5) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    getUserProfile: (userId: number) => {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(res => res.data)
    },
    follow: (userId: number) => {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(res => res.data)
    },
    unfollow: (userId: number) => {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(res => res.data)
    },
}

export const authAPI = {
    getAuthUser: () => {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`).then(res => res.data)
    }

}

