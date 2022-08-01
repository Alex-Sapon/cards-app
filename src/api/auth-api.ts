import axios, {AxiosResponse} from 'axios';
import {instance} from './instance-api';

//api
export const authAPI = {
    me() {
        return instance.post<UserResponseType>(`auth/me`);
    },
    registration(data: RegistrationPayloadType) {
        return instance.post<any, AxiosResponse<RegistrationResponseType>, RegistrationPayloadType>('auth/register', data);
    },
    login(data: LoginPayloadType) {
        return instance.post<any, AxiosResponse<UserResponseType>, LoginPayloadType>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType>('auth/me');
    },
    updateProfile(data: UpdateProfilePayloadType) {
        return instance.put<any, AxiosResponse<UpdateProfileResponseType>, UpdateProfilePayloadType>('auth/me', data);
    },
    forgotPassword(data: ForgotPasswordPayloadType) {
        return instance.post<any, AxiosResponse<ResponseType>, ForgotPasswordPayloadType>(`auth/forgot`, data);
    },
    updatePassword(data: UpdatePasswordPayloadType) {
        return instance.post<any, AxiosResponse<ResponseType>, UpdatePasswordPayloadType>(`auth/set-new-password`, data);
    },
};

//types
type ResponseType = {
    info: string
    error: string
}
type RegistrationResponseType = {
    addedUser: {
        _id: string,
        email: string,
        rememberMe: boolean,
        isAdmin: boolean,
        name: string,
        verified: boolean,
        publicCardPacksCount: number,
        created: string,
        updated: string,
        __v: number
    },
    error?: string,
}
type RegistrationPayloadType = {
    email: string,
    password: string
}
export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
}
export type UserResponseType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    __v: number,
    token: string,
    tokenDeathTime: number,
    avatar: string
    error?: string
}
export type UpdateProfileResponseType = {
    updatedUser: UserResponseType,
    token: string,
    tokenDeathTime: number
}
export type UpdateProfilePayloadType = {
    name: string,
    avatar: string
}
export type ForgotPasswordPayloadType = {
    email: string
    from: string
    message: string
}
export type UpdatePasswordPayloadType = {
    password: string
    resetPasswordToken: string
}



