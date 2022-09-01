import axios, {AxiosError} from 'axios';
import {ErrorData} from '../../features/users/api/apiUsers';
import {put} from 'redux-saga/effects';
import {setAppError} from '../../app';

export function* handleAppError(error: AxiosError) {
    const err = error as Error | AxiosError<ErrorData>
    if (axios.isAxiosError(err)) {
        yield put(setAppError(err.response ? err.response.data.error : err.message));
    } else {
        yield put(setAppError(err.message));
    }
}