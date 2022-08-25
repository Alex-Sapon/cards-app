import {AppThunk} from '../../../app/store';
import {authAPI, ForgotPasswordType} from '../../../api/authAPI';
import {setAppError, setAppStatus} from '../../../app/reducer/app-reducer';
import axios, {AxiosError} from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';

const initial: RecoveryPasswordStateType = {
    email: 'example@mail.com',
    isSendEmail: false,
}

export const recoveryPasswordReducer = (state: RecoveryPasswordStateType = initial, action: RecoveryPasswordActionsType): RecoveryPasswordStateType => {
    switch (action.type) {
        case 'RECOVERY-PASSWORD/SET-IS-SEND-EMAIL':
            return {...state, isSendEmail: action.isSend};
        case 'RECOVERY-PASSWORD/SET-EMAIL':
            return {...state, email: action.email};
        default:
            return state;
    }
};

export const setIsSendEmail = (isSend: boolean) => ({
    type: 'RECOVERY-PASSWORD/SET-IS-SEND-EMAIL',
    isSend,
} as const);

export const setEmail = (email: string) => ({
    type: 'RECOVERY-PASSWORD/SET-EMAIL',
    email,
} as const);

export function* forgotPasswordSaga({email}: ReturnType<typeof forgotPass>) {
    const data: ForgotPasswordType = {
        email: email,
        from: 'alexsapon@gmail.com',
        message: `
                <div style="background-color: lime; padding: 15px">password recovery link: 
                    <a href='https://alex-sapon.github.io/cards/#/set-new-password/$token$'> link</a>
                </div>
                `,
    }

    yield put(setAppStatus('loading'));

    try {
        yield call(authAPI.forgotPassword, data);
        yield put(setIsSendEmail(true));
        yield put(setEmail(email));
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

export function* recoveryPasswordWatcher() {
    yield takeEvery('RECOVERY-PASSWORD/FORGOT-PASSWORD', forgotPasswordSaga);
}

export const forgotPass = (email: string) => ({type: 'RECOVERY-PASSWORD/FORGOT-PASSWORD', email} as const);

export type RecoveryPasswordActionsType =
    | ReturnType<typeof setIsSendEmail>
    | ReturnType<typeof setEmail>

export type RecoveryPasswordStateType = {
    email: string
    isSendEmail: boolean
}
