import {AppThunk} from '../../../app/store';
import {AxiosError} from 'axios';
import {authAPI} from '../../../api/auth-api';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';

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

//actions
export const setRegisterMessageAC = (message: string | null) => ({type: 'REGISTRATION/SET-MESSAGE', message} as const);

//thunks
export const userRegisterTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.registration({email, password})
        .then((res) => {
            if (res.data.addedUser) {
                dispatch(setRegisterMessageAC('You have successfully registered'));
            } else if (res.data.error) {
                dispatch(setAppErrorAC(res.data.error));
            } else {
                dispatch(setRegisterMessageAC('Some error occurred'));
            }
        })
        .catch((error: AxiosError<{ error: string }>) => {
            if (error.response) {
                if (error.response.data === undefined) {
                    dispatch(setAppErrorAC(error.message));
                    dispatch(setAppStatusAC('failed'));
                } else {
                    dispatch(setAppErrorAC(error.response.data.error));
                    dispatch(setAppStatusAC('failed'));
                }
            }
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        });
};

//types
export type RegistrationStateType = {
    message: string | null
}
export type RegistrationActionsType =
    | ReturnType<typeof setRegisterMessageAC>



