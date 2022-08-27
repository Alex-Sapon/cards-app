import {apiPacksList, PacksParamsResponseType, PackType} from './apiPacksList';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {setAppError, setAppStatus} from '../../app';
import {AppStateType} from '../../app/store';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {TablePacksType} from './tablePacks/tablePacksReducer';
import {ErrorData} from '../users/usersAPI';

const initial: PacksListStateType = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
    packName: '',
    packId: '',
}

export const selectTablePacks = (state: AppStateType) => state.tablePacks;

export const packsListReducer = (state: PacksListStateType = initial, action: PacksListActionsType): PacksListStateType => {
    switch (action.type) {
        case 'PACKS-LIST/SET-PACKS-LIST-PARAMS':
        case 'PACKS-LIST/SET-PACK-MODAL-PARAMS':
            return {...state, ...action.data};
        default:
            return state;
    }
};

const setPacksListData = (data: PacksParamsResponseType) => ({
    type: 'PACKS-LIST/SET-PACKS-LIST-PARAMS',
    data,
} as const);

export const setPackModalParams = (data: { packId: string, packName?: string }) => ({
    type: 'PACKS-LIST/SET-PACK-MODAL-PARAMS',
    data,
} as const);

export const fetchCardPacks = () => ({type: 'PACKS-LIST/FETCH-CARD-PACKS'} as const);

export function* fetchCardPacksSaga() {
    const {pageCount, page, packName, sortPacks, user_id, min, max}: TablePacksType = yield select(selectTablePacks);

    yield put(setAppStatus('loading'));

    try {
        const res: AxiosResponse<PacksParamsResponseType> = yield call(apiPacksList.getPacks, {
            packName,
            sortPacks,
            page,
            pageCount,
            user_id,
            min,
            max,
        });

        yield put(setPacksListData(res.data));
    } catch (e) {
        const err = e as Error | AxiosError<ErrorData>
        if (axios.isAxiosError(err)) {
            yield put(setAppError(err.response ? err.response.data.error : err.message));
        } else {
            yield put(setAppError(err.message));
        }
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* packsListWatcher() {
    yield takeEvery('PACKS-LIST/FETCH-CARD-PACKS', fetchCardPacksSaga);
}

export type PacksListActionsType = ReturnType<typeof setPacksListData> | ReturnType<typeof setPackModalParams>

type PacksListStateType = PacksParamsResponseType & {
    packName: string
    packId: string
}