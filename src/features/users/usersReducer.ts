import {socialAPI, UsersParamsType, UsersResponseType, UserProfileType} from './usersAPI';
import {AppStateType, AppThunk} from '../../app/store';
import {setAppErrorAC, setAppStatusAC} from '../../app/reducer/app-reducer';
import axios, {AxiosError} from 'axios';

const initState: UsersStateType = {
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

export const usersReducer = (state: UsersStateType = initState, action: UsersActionsType): UsersStateType => {
    switch(action.type) {
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

export const setUsers = (usersData: UsersResponseType) => ({
    type: 'USERS/SET-USERS',
    usersData,
} as const);

export const setUserProfile = (user: UserProfileType) => ({
    type: 'USERS/SET-USER-PROFILE',
    user,
} as const);

export const setPageUsers = (page: number) => ({
    type: 'USERS/SET-PAGE-USERS',
    page,
} as const);

export const setPageCountUsers = (pageCount: number) => ({
    type: 'USERS/SET-PAGE-COUNT-USERS',
    pageCount,
} as const);

export const setSearchName = (userName: string) => ({
    type: 'USERS/SET-SEARCH-USER-NAME',
    userName,
} as const);

export const getUsers = (): AppThunk => async (dispatch, getState: () => AppStateType) => {
    const {userName, min, max, sortUsers, page, pageCount} = getState().usersPage.usersParams;

    const data = {userName, min, max, sortUsers, page, pageCount};

    dispatch(setAppStatusAC('loading'));

    try {
        const res = await socialAPI.getUsers(data);
        dispatch(setUsers(res.data));
    } catch (e) {
        const err = e as Error | AxiosError<{error: string}>;
        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message));
        } else {
            dispatch(setAppErrorAC(err.message));
        }
    } finally {
        dispatch(setAppStatusAC('idle'));
    }
}

export const getUser = (id: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));

    try {
        const res = await socialAPI.getUser(id);
        dispatch(setUserProfile(res.data.user));
    } catch (e) {
        const err = e as Error | AxiosError<{error: string}>;

        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message));
        } else {
            dispatch(setAppErrorAC(err.message));
        }
    } finally {
        dispatch(setAppStatusAC('idle'));
    }
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