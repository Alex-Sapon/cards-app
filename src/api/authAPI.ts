import {AxiosResponse} from 'axios';
import {instance} from './instance';

export const authAPI = {
    me() {
        return instance.post<UserResponseType>('auth/me');
    },
    registration(data: RegistrationType) {
        return instance.post<any, AxiosResponse<RegistrationResponseType>, RegistrationType>('auth/register', data);
    },
    login(data: LoginType) {
        return instance.post<any, AxiosResponse<UserResponseType>, LoginType>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType>('auth/me');
    },
    updateProfile(data: UpdateProfileType) {
        return instance.put<any, AxiosResponse<UpdateProfileResponseType>, UpdateProfileType>('auth/me', data);
    },
    forgotPassword(data: ForgotPasswordType) {
        return instance.post<any, AxiosResponse<ResponseType>, ForgotPasswordType>('auth/forgot', data);
    },
    updatePassword(data: UpdatePasswordType) {
        return instance.post<any, AxiosResponse<ResponseType>, UpdatePasswordType>('auth/set-new-password', data);
    },
};

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

type RegistrationType = {
    email: string,
    password: string
}

export type LoginType = {
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

export type UpdateProfileType = {
    name: string,
    avatar: string
}

export type ForgotPasswordType = {
    email: string
    from: string
    message: string
}

export type UpdatePasswordType = {
    password: string
    resetPasswordToken: string
}



