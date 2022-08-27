import axios, {AxiosError} from 'axios';
import {authAPI} from '../../../api/authAPI';
import {setAppError, setAppStatus} from '../../../app';
import {call, put, takeEvery} from 'redux-saga/effects';

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
        yield call(authAPI.registration, {email, password});
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            yield put(setAppError(err.response ? err.response.data.error : err.message));
        } else {
            yield put(setAppError(err.message));
        }
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



