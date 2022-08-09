import {instance} from '../../api/instance';
import {AxiosResponse} from 'axios';

export const socialAPI = {
    getUsers(data: UsersParamsType) {
        return instance.get<any, AxiosResponse<UsersResponseType>, UsersParamsType>('social/users', {params: data})
    },
    getUser(id: string) {
        return instance.get<any, AxiosResponse<{ user: UserProfileType }>, { id: string }>(`social/user/?id=${id}`)
    },
}

export type UsersParamsType = {
    userName?: string
    min?: number
    max?: number
    sortUsers?: string
    page?: number
    pageCount?: number
}

export type UsersResponseType = {
    users: UserProfileType[]
    maxPublicCardPacksCount: number
    minPublicCardPacksCount: number
    page: number
    pageCount: number
    usersTotalCount: number
}

export type UserProfileType = {
    avatar: string
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    updated: Date
    verified: boolean
    _id: string
}


