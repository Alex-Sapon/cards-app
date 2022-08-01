import {AppThunk} from '../../../app/store';
import {AxiosError} from 'axios';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import {fetchCardPacks} from '../packsListReducer';
import {NewCardsPackType, tablePacksAPI} from './tablePacks-api';

const initialState: TablePacksType = {
    packName: '',
    sortPacks: '',
    page: 1,
    pageCount: 5,
    user_id: '',
    min: 0,
    max: 110,
    packId: '',
    name: ''
};

export const tablePacksReducer = (state: TablePacksType = initialState, action: TablePacksActionsType): TablePacksType => {
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

// actions
export const setPage = (page: number) => ({type: 'TABLE-PACKS/SET-PAGE', page} as const);
export const setCardsPageCount = (pageCount: number) => ({type: 'TABLE-PACKS/SET-PAGE-COUNT', pageCount} as const);
export const setSearchPackName = (searchPackName: string) => ({
    type: 'TABLE-PACKS/SET-SEARCH-PACK-NAME',
    searchPackName
} as const);
export const setSortPackName = (sortPackName: string) => ({
    type: 'TABLE-PACKS/SET-SORT-PACK-NAME',
    sortPackName
} as const);
export const setUserId = (user_id: string) => ({type: 'TABLE-PACKS/SET-USER-ID', user_id} as const);
export const setMinNumberCards = (min: number) => ({type: 'TABLE-PACKS/SET-MIN-NUMBER-CARDS', min} as const);
export const setMaxNumberCards = (max: number) => ({type: 'TABLE-PACKS/SET-MAX-NUMBER-CARDS', max} as const);
export const setPackId = (id: string) => ({type: 'TABLE-PACKS/SET-PACK-ID', id} as const);
export const setPackName = (name: string) => ({type: 'TABLE-PACKS/SET-PACK-NAME', name} as const);

// thunks
export const createNewCardsPack = (name: string, isPrivate: boolean): AppThunk => dispatch => {
    const data: NewCardsPackType = {
        cardsPack: {
            name: name,
            deckCover: '',
            private: isPrivate,
        },
    };

    dispatch(setAppStatusAC('loading'));

    tablePacksAPI.createPack(data)
        .then(() => {
            dispatch(fetchCardPacks());
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message));
            dispatch(setAppStatusAC('idle'));
        });
};

export const deleteUpdateCardsPack = (id: string, name?: string): AppThunk => dispatch => {
    const apiMethod = name
        ? tablePacksAPI.updatePack({cardsPack: {_id: id, name: name}})
        : tablePacksAPI.deletePack(id);

    dispatch(setAppStatusAC('loading'));

    apiMethod
        .then(() => {
            dispatch(fetchCardPacks());
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message));
            dispatch(setAppStatusAC('idle'));
        });
};

// types
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