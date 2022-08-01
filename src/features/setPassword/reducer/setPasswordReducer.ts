import {authAPI, UpdatePasswordPayloadType} from '../../../api/auth-api';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import {AppThunk} from '../../../app/store';

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
}

//actions
export const setNewPassword = (isUpdatePass: boolean) => ({type: 'SET-PASSWORD/UPDATE-PASSWORD', isUpdatePass,} as const);

//thunks
export const updateNewPassword = (data: UpdatePasswordPayloadType): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));

    authAPI.updatePassword(data)
        .then(res => {
            dispatch(setNewPassword(true));
        })
        .catch((e) => {
            dispatch(setAppErrorAC(e.message));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
}

//types
export type SetNewPasswordActionsType =
    | ReturnType<typeof setNewPassword>
export type SetPasswordStateType = {
    isUpdatePassword: boolean
}