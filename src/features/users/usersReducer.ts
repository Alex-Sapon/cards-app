import {usersAPI, UsersParamsType, UsersResponseType, UserType} from './usersAPI';
import {AppStateType, AppThunk} from '../../app/store';
import {setAppErrorAC, setAppStatusAC} from '../../app/reducer/app-reducer';
import axios, {AxiosError} from 'axios';

const initState: UsersStateType = {
    users: [] as UserType[],
    maxPublicCardPacksCount: 0,
    minPublicCardPacksCount: 0,
    page: 1,
    pageCount: 4,
    usersTotalCount: 7,
    usersParams: {
        userName: '',
        min: 0,
        max: 10000,
        sortUsers: '',
        page: 1,
        pageCount: 8,
    } as UsersParamsType,
}

export const usersReducer = (state: UsersStateType = initState, action: UsersActionsType): UsersStateType => {
    switch(action.type) {
        case 'USERS/SET-USERS':
            return {...state, users: action.users};
        default:
            return state;
    }
}

export const setUsers = (users: UserType[]) => ({
    type: 'USERS/SET-USERS',
    users,
});

export const getUsers = (): AppThunk => async (dispatch, getState: () => AppStateType) => {
    const {userName, min, max, sortUsers, page, pageCount} = getState().usersPage.usersParams;

    const data = {userName, min, max, sortUsers, page, pageCount};

    dispatch(setAppStatusAC('loading'));

    try {
        const res = await usersAPI.getUsers(data);
        dispatch(setUsers(res.data.users));
    } catch (e) {
        const err = e as Error | AxiosError<{error: string}>;
        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message));
        } else {
            dispatch(setAppErrorAC(err.message));
        }
    }
}

type UsersStateType = UsersResponseType & {
    usersParams: UsersParamsType
}

export type UsersActionsType = ReturnType<typeof setUsers>