import {socialAPI, UsersParamsType, UsersResponseType, UserProfileType} from './usersAPI';
import {AppStateType, AppThunk} from '../../app/store';
import {setAppError, setAppStatus} from '../../app/reducer/app-reducer';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {call, put, select, takeEvery} from 'redux-saga/effects';

const initial: UsersStateType = {
    users: [] as UserProfileType[],
    user: {} as UserProfileType,
    maxPublicCardPacksCount: 0,
    minPublicCardPacksCount: 0,
    page: 1,
    pageCount: 0,
    usersTotalCount: 0,
    usersParams: {
        userName: '',
        min: 0,
        max: 10000,
        sortUsers: '',
        page: 1,
        pageCount: 5,
    } as UsersParamsType,
}

export const selectUsersParams = (state: AppStateType) => state.usersPage.usersParams;

export const usersReducer = (state: UsersStateType = initial, action: UsersActionsType): UsersStateType => {
    switch (action.type) {
        case 'USERS/SET-USERS':
            return {...state, ...action.usersData};
        case 'USERS/SET-USER-PROFILE':
            return {...state, user: action.user};
        case 'USERS/SET-PAGE-USERS':
            return {...state, usersParams: {...state.usersParams, page: action.page}};
        case 'USERS/SET-PAGE-COUNT-USERS':
            return {...state, usersParams: {...state.usersParams, pageCount: action.pageCount}};
        case 'USERS/SET-SEARCH-USER-NAME':
            return {...state, usersParams: {...state.usersParams, userName: action.userName}};
        default:
            return state;
    }
}

export const setUsers = (usersData: UsersResponseType) => ({type: 'USERS/SET-USERS', usersData} as const);

export const setUserProfile = (user: UserProfileType) => ({type: 'USERS/SET-USER-PROFILE', user} as const);

export const setPageUsers = (page: number) => ({type: 'USERS/SET-PAGE-USERS', page} as const);

export const setPageCountUsers = (pageCount: number) => ({type: 'USERS/SET-PAGE-COUNT-USERS', pageCount} as const);

export const setSearchName = (userName: string) => ({type: 'USERS/SET-SEARCH-USER-NAME', userName} as const);

export const getUsers = () => ({type: 'USERS/FETCH-USERS'} as const);

export const getUser = (id: string) => ({type: 'USERS/FETCH-USER', id} as const);

export function* getUsersSaga() {
    const {userName, min, max, sortUsers, page, pageCount}: UsersParamsType = yield select(selectUsersParams);

    yield put(setAppStatus('loading'));

    try {
        const res: AxiosResponse<UsersResponseType> = yield call(socialAPI.getUsers, {
            userName,
            min,
            max,
            sortUsers,
            page,
            pageCount
        });

        yield put(setUsers(res.data));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        if (axios.isAxiosError(err)) {
            yield put(setAppError(err.response ? err.response.data.error : err.message));
        } else {
            yield put(setAppError(err.message));
        }
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* getUserSaga({id}: ReturnType<typeof getUser>) {
    yield put(setAppStatus('loading'));

    try {
        const res: AxiosResponse<{ user: UserProfileType }> = yield call(socialAPI.getUser, id);
        yield put(setUserProfile(res.data.user));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        if (axios.isAxiosError(err)) {
            yield put(setAppError(err.response ? err.response.data.error : err.message));
        } else {
            yield put(setAppError(err.message));
        }
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* usersWatcher() {
    yield takeEvery('USERS/FETCH-USERS', getUsersSaga);
    yield takeEvery('USERS/FETCH-USER', getUserSaga);
}

type UsersStateType = UsersResponseType & {
    usersParams: UsersParamsType
    user: UserProfileType
}

export type UsersActionsType =
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setPageUsers>
    | ReturnType<typeof setPageCountUsers>
    | ReturnType<typeof setSearchName>
    | ReturnType<typeof setUserProfile>