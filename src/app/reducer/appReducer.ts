import {setIsLoggedIn, setLoginData} from '../../features/login/reducer/loginReducer';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {authAPI, UserResponseType} from '../../api/authAPI';
import {call, put, takeEvery} from 'redux-saga/effects';

const initial: StateType = {
    isInitialized: false,
    status: 'idle',
    error: null,
};

export const appReducer = (state: StateType = initial, action: ActionsType): StateType => {
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

const setInitializeApp = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZE-APP', isInitialized} as const);

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-APP-STATUS', status} as const);

export const setAppError = (error: string | null) => ({type: 'APP/SET-APP-ERROR', error} as const);

export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'} as const);

export function* initializeAppSaga() {
    try {
        const res: AxiosResponse<UserResponseType> = yield call(authAPI.me);
        yield put(setLoginData(res.data));
        yield put(setIsLoggedIn(true));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        if (axios.isAxiosError(err)) {
            yield put(setAppError(err.response ? err.response.data.error : err.message));
        } else {
            yield put(setAppError(err.message));
        }
    } finally {
        yield put(setInitializeApp(true));
    }
}

export function* appWatcher() {
    yield takeEvery('APP/INITIALIZE-APP', initializeAppSaga);
}

type StateType = {
    isInitialized: boolean
    status: RequestStatusType
    error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ActionsType =
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