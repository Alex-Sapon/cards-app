import {AxiosError, AxiosResponse} from 'axios';
import {apiAuth, LoginType, UpdateProfileResponseType, UserResponseType} from '../api/apiAuth';
import {setAppStatus} from '../../../app';
import {call, put, takeEvery} from 'redux-saga/effects';
import {handleAppError} from '../../../assets/utils';

const initial: LoginDataUserType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
    __v: 0,
    token: '',
    tokenDeathTime: 0,
    isLoggedIn: false,
}

export const loginReducer = (state: LoginDataUserType = initial, action: LoginActionsType): LoginDataUserType => {
    switch (action.type) {
        case 'LOGIN/SET-LOGIN-DATA-USER':
            return {...state, ...action.data};
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn};
        default:
            return state;
    }
};

export const setLoginData = (data: UserResponseType) => ({type: 'LOGIN/SET-LOGIN-DATA-USER', data} as const);

export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', isLoggedIn} as const);

export const login = (data: LoginType) => ({type: 'LOGIN/LOGIN-PROFILE', data} as const);

export const logout = () => ({type: 'LOGIN/LOGOUT-PROFILE'} as const);

export const updateUserData = (name: string, avatar: string) => ({
    type: 'LOGIN/UPDATE-USER-DATA',
    name,
    avatar,
} as const);

export function* loginSaga({data}: ReturnType<typeof login>) {
    try {
        yield put(setAppStatus('loading'));
        const res: AxiosResponse<UserResponseType> = yield apiAuth.login(data);
        yield put(setLoginData(res.data));
        yield put(setIsLoggedIn(true));
    } catch (e) {
        yield handleAppError(e as AxiosError)
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* logoutSaga() {
    try {
        yield put(setAppStatus('loading'));
        yield call(apiAuth.logout);
        yield put(setIsLoggedIn(false));
    } catch (e) {
        yield handleAppError(e as AxiosError)
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* updateUserDataSaga({name, avatar}: ReturnType<typeof updateUserData>) {
    try {
        yield put(setAppStatus('loading'));
        const res: AxiosResponse<UpdateProfileResponseType> = yield call(apiAuth.updateProfile, {name, avatar});
        yield put(setLoginData(res.data.updatedUser));
    } catch (e) {
        yield handleAppError(e as AxiosError)
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* loginWatcher() {
    yield takeEvery('LOGIN/LOGOUT-PROFILE', logoutSaga);
    yield takeEvery('LOGIN/LOGIN-PROFILE', loginSaga);
    yield takeEvery('LOGIN/UPDATE-USER-DATA', updateUserDataSaga);
}

export type LoginActionsType = ReturnType<typeof setLoginData> | ReturnType<typeof setIsLoggedIn>

export type LoginDataUserType = UserResponseType & {
    isLoggedIn: boolean
}
