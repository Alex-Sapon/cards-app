import {AppThunk} from '../store';
import {setIsLoggedIn, setLoginData} from '../../features/login/reducer/loginReducer';
import {AxiosError} from 'axios';
import {authAPI} from '../../api/authAPI';

const initialState: AppStateType = {
    isInitialized: false,
    status: 'idle',
    error: null,
};

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZE-APP':
            return {...state, isInitialized: action.isInitialized};
        case 'APP/SET-APP-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-APP-ERROR':
            return {...state, error: action.error};
        default:
            return state;
    }
};

const setInitializeApp = (isInitialized: boolean) => ({
    type: 'APP/SET-INITIALIZE-APP',
    isInitialized,
} as const);

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-APP-STATUS',
    status,
} as const);

export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-APP-ERROR',
    error,
} as const);

export const initializeApp = (): AppThunk => dispatch => {
    authAPI.me()
        .then((res) => {
            dispatch(setLoginData(res.data));
            dispatch(setIsLoggedIn(true));
        })
        .catch((e: AxiosError<{ error: string }, any>) => {
            const error = (e.response && e.response.data) ? e.response.data.error : e.message;
            setAppErrorAC(error);
        })
        .finally(() => {
            dispatch(setInitializeApp(true));
        });
};

type AppStateType = {
    isInitialized: boolean
    status: RequestStatusType
    error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionsType =
    | ReturnType<typeof setInitializeApp>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>