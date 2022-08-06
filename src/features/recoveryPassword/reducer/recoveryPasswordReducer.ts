import {AppThunk} from '../../../app/store';
import {authAPI, ForgotPasswordType} from '../../../api/auth-api';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import axios, {AxiosError} from 'axios';

const initialState: RecoveryPasswordStateType = {
    email: 'example@mail.com',
    isSendEmail: false,
}

export const recoveryPasswordReducer = (state: RecoveryPasswordStateType = initialState, action: RecoveryPasswordActionsType): RecoveryPasswordStateType => {
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

export const forgotPass = (email: string): AppThunk => async dispatch => {
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
        dispatch(setAppStatusAC('loading'));
        await authAPI.forgotPassword(data);
        dispatch(setIsSendEmail(true));
        dispatch(setEmail(email));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;

        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message));
        } else {
            dispatch(setAppErrorAC(err.message));
        }
    } finally {
        dispatch(setAppStatusAC('idle'));
    }
};

export type RecoveryPasswordActionsType =
    | ReturnType<typeof setIsSendEmail>
    | ReturnType<typeof setEmail>

export type RecoveryPasswordStateType = {
    email: string
    isSendEmail: boolean
}
