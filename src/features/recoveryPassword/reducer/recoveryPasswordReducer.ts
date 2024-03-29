import {apiAuth, ForgotPasswordType} from '../../login/api/apiAuth';
import {setAppStatus} from '../../../app';
import {AxiosError} from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import {handleAppError} from '../../../assets/utils';

const initial: StateType = {
    email: 'example@mail.com',
    isSendEmail: false,
}

export const recoveryPasswordReducer = (state: StateType = initial, action: ActionsType): StateType => {
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

export const forgotPass = (email: string) => ({type: 'RECOVERY-PASSWORD/FORGOT-PASSWORD', email} as const);

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

    try {
        yield put(setAppStatus('loading'));
        yield call(apiAuth.forgotPassword, data);
        yield put(setIsSendEmail(true));
        yield put(setEmail(email));
    } catch (e) {
        yield handleAppError(e as AxiosError);
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* recoveryPasswordWatcher() {
    yield takeEvery('RECOVERY-PASSWORD/FORGOT-PASSWORD', forgotPasswordSaga);
}

export type ActionsType = ReturnType<typeof setIsSendEmail> | ReturnType<typeof setEmail>

export type StateType = {
    email: string
    isSendEmail: boolean
}
