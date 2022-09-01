import {apiPacksList, PacksParamsResponseType, PackType} from '../api/apiPacksList';
import {AxiosError, AxiosResponse} from 'axios';
import {setAppStatus} from '../../../app';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {StateType as TablePacksType} from '../tablePacks/reducer/tablePacksReducer';
import {selectTablePacks} from '../tablePacks';
import {handleAppError} from '../../../assets/utils';

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

    try {
        yield put(setAppStatus('loading'));
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
        yield handleAppError(e as AxiosError)
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