import {apiAuth, UpdatePasswordType} from '../../login/api/apiAuth';
import {setAppStatus} from '../../../app';
import {AxiosError} from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import {handleAppError} from '../../../assets/utils';

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
        yield call(apiAuth.updatePassword, data);
        yield put(setNewPassword(true));
    } catch (e) {
        yield handleAppError(e as AxiosError);
        yield put(setAppStatus('idle'));
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