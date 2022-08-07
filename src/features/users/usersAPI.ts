import {instance} from '../../api/instance';
import {AxiosResponse} from 'axios';

export const usersAPI = {
    getUsers(data: UsersParamsType) {
        return instance.get<any, AxiosResponse<UsersResponseType>, UsersParamsType>('social/users', {params: data})
    }
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
    users: UserType[]
    maxPublicCardPacksCount: number
    minPublicCardPacksCount: number
    page: number
    pageCount: number
    usersTotalCount: number
}

export type UserType = {
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