import {packsListApi, PacksParamsResponseType, PackType} from './packsList-api';
import axios, {AxiosError} from 'axios';
import {setAppError, setAppStatus} from '../../app/reducer/app-reducer';
import {AppStateType, AppThunk} from '../../app/store';

const initialState: PacksListStateType = {
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

export const packsListReducer = (state: PacksListStateType = initialState, action: PacksListActionsType): PacksListStateType => {
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

export const setPackModalParams = (data: {packId: string, packName?: string}) => ({
    type: 'PACKS-LIST/SET-PACK-MODAL-PARAMS',
    data,
} as const);

export const fetchCardPacks = (): AppThunk => async (dispatch, getState: () => AppStateType) => {
    const {pageCount, page, packName, sortPacks, user_id, min, max} = getState().tablePacks;

    const params = {
        packName,
        sortPacks,
        page,
        pageCount,
        user_id,
        min,
        max,
    }

    dispatch(setAppStatus('loading'));

    try {
        const res = await packsListApi.getPacks(params);
        dispatch(setPacksListData(res.data));
    } catch (e) {
        const error = e as Error | AxiosError<{error: string}>
        if (axios.isAxiosError(error)) {
            dispatch(setAppError(error.response ? error.response.data.error : error.message));
        } else {
            dispatch(setAppError(error.message));
        }
    } finally {
        dispatch(setAppStatus('idle'));
    }
}

export type PacksListActionsType =
    | ReturnType<typeof setPacksListData>
    | ReturnType<typeof setPackModalParams>

type PacksListStateType = PacksParamsResponseType & {
    packName: string
    packId: string
}