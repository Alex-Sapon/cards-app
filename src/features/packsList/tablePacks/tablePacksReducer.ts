import {AxiosError} from 'axios';
import {setAppError, setAppStatus} from '../../../app/reducer/app-reducer';
import {fetchCardPacks} from '../packsListReducer';
import {tablePacksAPI} from './tablePacks-api';
import {call, put, takeEvery} from 'redux-saga/effects';

const initial: TablePacksType = {
    packName: '',
    sortPacks: '',
    page: 1,
    pageCount: 5,
    user_id: '',
    min: 0,
    max: 110,
    packId: '',
    name: '',
};

export const tablePacksReducer = (state: TablePacksType = initial, action: TablePacksActionsType): TablePacksType => {
    switch (action.type) {
        case 'TABLE-PACKS/SET-PAGE':
            return {...state, page: action.page};
        case 'TABLE-PACKS/SET-PAGE-COUNT':
            return {...state, pageCount: action.pageCount};
        case 'TABLE-PACKS/SET-SEARCH-PACK-NAME':
            return {...state, packName: action.searchPackName};
        case 'TABLE-PACKS/SET-SORT-PACK-NAME':
            return {...state, sortPacks: action.sortPackName};
        case 'TABLE-PACKS/SET-USER-ID':
            return {...state, user_id: action.user_id};
        case 'TABLE-PACKS/SET-MIN-NUMBER-CARDS':
            return {...state, min: action.min};
        case 'TABLE-PACKS/SET-MAX-NUMBER-CARDS':
            return {...state, max: action.max};
        case 'TABLE-PACKS/SET-PACK-ID':
            return {...state, packId: action.id};
        case 'TABLE-PACKS/SET-PACK-NAME':
            return {...state, name: action.name};
        default:
            return state;
    }
};

export const setPage = (page: number) => ({type: 'TABLE-PACKS/SET-PAGE', page} as const);

export const setCardsPageCount = (pageCount: number) => ({type: 'TABLE-PACKS/SET-PAGE-COUNT', pageCount} as const);

export const setSearchPackName = (searchPackName: string) => ({
    type: 'TABLE-PACKS/SET-SEARCH-PACK-NAME',
    searchPackName,
} as const);

export const setSortPackName = (sortPackName: string) => ({
    type: 'TABLE-PACKS/SET-SORT-PACK-NAME',
    sortPackName,
} as const);

export const setUserId = (user_id: string) => ({type: 'TABLE-PACKS/SET-USER-ID', user_id} as const);

export const setMinNumberCards = (min: number) => ({type: 'TABLE-PACKS/SET-MIN-NUMBER-CARDS', min} as const);

export const setMaxNumberCards = (max: number) => ({type: 'TABLE-PACKS/SET-MAX-NUMBER-CARDS', max} as const);

export const setPackId = (id: string) => ({type: 'TABLE-PACKS/SET-PACK-ID', id} as const);

export const setPackName = (name: string) => ({type: 'TABLE-PACKS/SET-PACK-NAME', name} as const);

export function* createCardsPackSaga({name, cover, isPrivate}: ReturnType<typeof createCardsPack>) {
    yield put(setAppStatus('loading'));

    try {
        yield call(tablePacksAPI.createPack, {cardsPack: {name: name, deckCover: cover, private: isPrivate}});
        yield put(fetchCardPacks());
    } catch (e) {
        const err = e as AxiosError<{ error: string }>
        yield put(setAppError(err.response ? err.response.data.error : err.message));
        yield put(setAppStatus('idle'));
    }
}

export function* deleteCardsPackSaga({id}: ReturnType<typeof deleteCardsPack>) {
    yield put(setAppStatus('loading'));

    try {
        yield call(tablePacksAPI.deletePack, id);
        yield put(fetchCardPacks());
    } catch (e) {
        const err = e as AxiosError<{ error: string }>;
        yield put(setAppError(err.response ? err.response.data.error : err.message));
        yield put(setAppStatus('idle'));
    }
}

export function* updateCardsPackSaga({id, name, cover}: ReturnType<typeof updateCardsPack>) {
    yield put(setAppStatus('loading'));

    try {
        yield call(tablePacksAPI.updatePack, {cardsPack: {_id: id, name: name, deckCover: cover}})
        yield put(fetchCardPacks());
    } catch (e) {
        const err = e as AxiosError<{ error: string }>;
        yield put(setAppError(err.response ? err.response.data.error : err.message));
        yield put(setAppStatus('idle'));
    }
}

export function* tablePacksWatcher() {
    yield takeEvery('TABLE-PACKS/CREATE-CARDS-PACK', createCardsPackSaga);
    yield takeEvery('TABLE-PACKS/DELETE-CARDS-PACK', deleteCardsPackSaga);
    yield takeEvery('TABLE-PACKS/UPDATE-CARDS-PACK', updateCardsPackSaga);
}

export const createCardsPack = (name: string, cover: string, isPrivate: boolean) => ({
    type: 'TABLE-PACKS/CREATE-CARDS-PACK',
    name,
    cover,
    isPrivate,
} as const);

export const deleteCardsPack = (id: string) => ({
    type: 'TABLE-PACKS/DELETE-CARDS-PACK',
    id,
} as const);

export const updateCardsPack = (id: string, name: string, cover: string) => ({
    type: 'TABLE-PACKS/UPDATE-CARDS-PACK',
    id,
    name,
    cover,
} as const);

export type TablePacksActionsType =
    | ReturnType<typeof setPage>
    | ReturnType<typeof setCardsPageCount>
    | ReturnType<typeof setSearchPackName>
    | ReturnType<typeof setSortPackName>
    | ReturnType<typeof setUserId>
    | ReturnType<typeof setMinNumberCards>
    | ReturnType<typeof setMaxNumberCards>
    | ReturnType<typeof setPackId>
    | ReturnType<typeof setPackName>

export type TablePacksType = {
    packName: string
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
    min: number
    max: number,
    packId: string,
    name: string
}