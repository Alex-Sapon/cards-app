import {socialAPI, UserProfileType, UsersParamsType, UsersResponseType} from '../api/apiUsers';
import {setAppStatus} from '../../../app';
import {AxiosError, AxiosResponse} from 'axios';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {selectUsersParams} from '../index';
import {handleAppError} from '../../../assets/utils';

const initial: StateType = {
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

export const usersReducer = (state: StateType = initial, action: ActionsType): StateType => {
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

    try {
        yield put(setAppStatus('loading'));
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
        yield handleAppError(e as AxiosError);
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* getUserSaga({id}: ReturnType<typeof getUser>) {
    try {
        yield put(setAppStatus('loading'));
        const res: AxiosResponse<{ user: UserProfileType }> = yield call(socialAPI.getUser, id);
        yield put(setUserProfile(res.data.user));
    } catch (e) {
        yield handleAppError(e as AxiosError);
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* usersWatcher() {
    yield takeEvery('USERS/FETCH-USERS', getUsersSaga);
    yield takeEvery('USERS/FETCH-USER', getUserSaga);
}

type StateType = UsersResponseType & {
    usersParams: UsersParamsType
    user: UserProfileType
}

export type ActionsType =
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setPageUsers>
    | ReturnType<typeof setPageCountUsers>
    | ReturnType<typeof setSearchName>
    | ReturnType<typeof setUserProfile>