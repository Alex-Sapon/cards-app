import {authAPI, UpdatePasswordType} from '../../../api/authAPI';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import {AppThunk} from '../../../app/store';
import {AxiosError} from 'axios';

const initialState: SetPasswordStateType = {
    isUpdatePassword: false,
}

export const setPasswordReducer = (state: SetPasswordStateType = initialState, action: SetNewPasswordActionsType): SetPasswordStateType => {
    switch (action.type) {
        case 'SET-PASSWORD/UPDATE-PASSWORD':
            return {...state, isUpdatePassword: action.isUpdatePass};
        default:
            return state;
    }
};

export const setNewPassword = (isUpdatePass: boolean) => ({
    type: 'SET-PASSWORD/UPDATE-PASSWORD',
    isUpdatePass,
} as const);

export const updateNewPassword = (data: UpdatePasswordType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'));
        await authAPI.updatePassword(data);
        dispatch(setNewPassword(true));
    } catch (e) {
        const err = e as Error | AxiosError;
        dispatch(setAppErrorAC(err.message));
    } finally {
        dispatch(setAppStatusAC('idle'));
    }
}

export type SetNewPasswordActionsType = ReturnType<typeof setNewPassword>

export type SetPasswordStateType = {
    isUpdatePassword: boolean
}