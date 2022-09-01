import {AxiosError} from 'axios';
import {apiAuth} from '../../login/api/apiAuth';
import {setAppStatus} from '../../../app';
import {call, put, takeEvery} from 'redux-saga/effects';
import {handleAppError} from '../../../assets/utils';

const initial: StateType = {
    message: null,
};

export const registrationReducer = (state: StateType = initial, action: ActionsType): StateType => {
    switch (action.type) {
        case 'REGISTRATION/SET-MESSAGE':
            return {...state, message: action.message};
        default:
            return state;
    }
};

export const setRegisterMessage = (message: string | null) => ({
    type: 'REGISTRATION/SET-MESSAGE',
    message,
}as const);

export const userRegister = (email: string, password: string) => ({
    type: 'REGISTRATION/SET-REGISTRATION',
    email,
    password,
} as const);

export function* userRegisterSaga({email, password}: ReturnType<typeof userRegister>) {
    try {
        yield put(setAppStatus('loading'));
        yield call(apiAuth.registration, {email, password});
    } catch (e) {
        yield handleAppError(e as AxiosError)
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* userRegisterWatcher() {
    yield takeEvery('REGISTRATION/SET-REGISTRATION', userRegisterSaga);
}

export type StateType = {
    message: string | null
}
export type ActionsType = ReturnType<typeof setRegisterMessage>



