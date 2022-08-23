import {setIsLoggedIn, setLoginData} from '../../features/login/reducer/loginReducer';
import {AxiosError, AxiosResponse} from 'axios';
import {authAPI, UserResponseType} from '../../api/authAPI';
import {call, put, takeEvery} from 'redux-saga/effects';

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

export const setAppStatus = (status: RequestStatusType) => ({
    type: 'APP/SET-APP-STATUS',
    status,
} as const);

export const setAppError = (error: string | null) => ({
    type: 'APP/SET-APP-ERROR',
    error,
} as const);

export function* initializeAppSaga() {
    try {
        const res: AxiosResponse<UserResponseType> = yield call(authAPI.me);
        yield put(setLoginData(res.data));
        yield put(setIsLoggedIn(true));
    } catch (e) {
        const err = e as AxiosError<{ error: string }>;
        // yield put(setAppError(err.response ? err.response.data.error : err.message));
        const error = err.response && err.response?.data ? err.response.data.error : err.message
        yield put({type: 'APP/SET-APP-ERROR', error});
    } finally {
        yield put(setInitializeApp(true));
    }
}

export function* appWatcherSaga() {
    yield takeEvery('APP/INITIALIZE-APP', initializeAppSaga);
}

export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'} as const);

type AppStateType = {
    isInitialized: boolean
    status: RequestStatusType
    error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionsType =
    | ReturnType<typeof setInitializeApp>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof initializeApp>

export type ResponseGenerator = {
    config?: any,
    data?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}