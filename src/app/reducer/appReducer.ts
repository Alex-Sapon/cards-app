import {setIsLoggedIn, setLoginData} from '../../features/login/reducer/loginReducer';
import {AxiosError, AxiosResponse} from 'axios';
import {apiAuth, UserResponseType} from '../../features/login/api/apiAuth';
import {call, put, takeEvery} from 'redux-saga/effects';
import {handleAppError} from '../../assets/utils';

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
        const res: AxiosResponse<UserResponseType> = yield call(apiAuth.me);
        yield put(setLoginData(res.data));
        yield put(setIsLoggedIn(true));
    } catch (e) {
        yield handleAppError(e as AxiosError)
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