import {authAPI, UpdatePasswordType} from '../../../api/authAPI';
import {setAppError, setAppStatus} from '../../../app';
import axios, {AxiosError} from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import {ErrorData} from '../../users/apiUsers';

const initial: StateType = {
    isUpdatePassword: false,
}

export const setPasswordReducer = (state: StateType = initial, action: ActionsType): StateType => {
    switch (action.type) {
        case 'SET-PASSWORD/UPDATE-PASS':
            return {...state, isUpdatePassword: action.isUpdatePass};
        default:
            return state;
    }
};

export const setNewPassword = (isUpdatePass: boolean) => ({type: 'SET-PASSWORD/UPDATE-PASS', isUpdatePass,} as const);

export const updateNewPassword = (data: UpdatePasswordType) => ({type: 'SET-PASSWORD/UPDATE-PASSWORD', data} as const);

export function* updateNewPasswordSaga({data}: ReturnType<typeof updateNewPassword>) {
    try {
        yield put(setAppStatus('loading'));
        yield call(authAPI.updatePassword, data);
        yield put(setNewPassword(true));
    } catch (e) {
        const err = e as Error | AxiosError<ErrorData>;
        if (axios.isAxiosError(err)) {
            yield put(setAppError(err.response ? err.response.data.error : err.message));
        } else {
            yield put(setAppError(err.message));
        }
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* updateNewPasswordWatcher() {
    yield takeEvery('SET-PASSWORD/UPDATE-PASSWORD', updateNewPasswordSaga);
}

export type ActionsType = ReturnType<typeof setNewPassword>

export type StateType = {
    isUpdatePassword: boolean
}