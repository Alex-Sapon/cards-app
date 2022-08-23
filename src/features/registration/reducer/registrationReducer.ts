import {AppThunk} from '../../../app/store';
import {AxiosError} from 'axios';
import {authAPI} from '../../../api/authAPI';
import {setAppError, setAppStatus} from '../../../app/reducer/app-reducer';

const initialState: RegistrationStateType = {
    message: null,
};

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsType): RegistrationStateType => {
    switch (action.type) {
        case 'REGISTRATION/SET-MESSAGE':
            return {...state, message: action.message};
        default:
            return state;
    }
};

export const setRegisterMessageAC = (message: string | null) => ({type: 'REGISTRATION/SET-MESSAGE', message} as const);

export const userRegisterTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(setAppStatus('loading'));

    authAPI.registration({email, password})
        .then((res) => {
            if (res.data.addedUser) {
                dispatch(setRegisterMessageAC('You have successfully registered'));
            } else if (res.data.error) {
                dispatch(setAppError(res.data.error));
            } else {
                dispatch(setRegisterMessageAC('Some error occurred'));
            }
        })
        .catch((error: AxiosError<{ error: string }>) => {
            if (error.response) {
                if (error.response.data === undefined) {
                    dispatch(setAppError(error.message));
                } else {
                    dispatch(setAppError(error.response.data.error));
                }
            }
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        });
};

export type RegistrationStateType = {
    message: string | null
}
export type RegistrationActionsType = | ReturnType<typeof setRegisterMessageAC>



