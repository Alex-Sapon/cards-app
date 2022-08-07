import {AppStateType, AppThunk} from '../../../app/store';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import axios, {AxiosError} from 'axios';
import {cardNameAPI, CardType, CreateCardType, PackResponseType, UpdateCardType,} from '../apiCardName/apiPackName';

const initialState: CardsNameStateType = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
    token: '',
    tokenDeathTime: 0,
    cardsPack_id: '',
    cardQuestion: '',
    packName: '',
    cardAnswer: '',
    sortCards: '',
    cardId: '',
    min: 0,
    max: 0,
}

export const cardsNameReducer = (state: CardsNameStateType = initialState, action: CardsNameActionsType): CardsNameStateType => {
    switch (action.type) {
        case 'CARDS-NAME/SET-CARDS-PARAMS':
            return {...state, ...action.data};
        case 'CARDS-NAME/SET-CARDS-QUESTION':
            return {...state, cardQuestion: action.searchCardQuestion};
        case 'CARDS-NAME/SET-USER-PACK-NAME':
            return {...state, packName: action.packName};
        case 'CARDS-NAME/SET-CARDS-PAGE':
            return {...state, page: action.page};
        case 'CARDS-NAME/SET-CARDS-PAGE-COUNT':
            return {...state, pageCount: action.pageCount};
        case 'CARDS-NAME/SET-CARDS-TOTAL-COUNT':
            return {...state, cardsTotalCount: action.cardsTotalCount};
        case 'CARDS-NAME/SET-USER-ID':
            return {...state, cardsPack_id: action.userId};
        case 'CARDS-NAME/SET-CARD-ID':
            return {...state, cardId: action.cardId};
        case 'CARDS-NAME/SET-SORT-CARDS':
            return {...state, sortCards: action.sortCards};
        default:
            return state;
    }
};

export const setSearchQuestion = (searchCardQuestion: string) => ({
    type: 'CARDS-NAME/SET-CARDS-QUESTION',
    searchCardQuestion,
} as const);

export const setUserCardId = (userId: string) => ({
    type: 'CARDS-NAME/SET-USER-ID',
    userId,
} as const);

export const setUserCardName = (packName: string) => ({
    type: 'CARDS-NAME/SET-USER-PACK-NAME',
    packName,
} as const);

export const getCardsNameData = (data: PackResponseType) => ({
    type: 'CARDS-NAME/SET-CARDS-PARAMS',
    data,
} as const);

export const setCardsPage = (page: number) => ({
    type: 'CARDS-NAME/SET-CARDS-PAGE',
    page,
} as const);

export const setCardsPageCount = (pageCount: number) => ({
    type: 'CARDS-NAME/SET-CARDS-PAGE-COUNT',
    pageCount,
} as const);

export const setCardsTotalCount = (cardsTotalCount: number) => ({
    type: 'CARDS-NAME/SET-CARDS-TOTAL-COUNT',
    cardsTotalCount,
} as const);

export const setCardId = (cardId: string) => ({
    type: 'CARDS-NAME/SET-CARD-ID',
    cardId,
} as const);

export const setSortCards = (sortCards: string) => ({
    type: 'CARDS-NAME/SET-SORT-CARDS',
    sortCards,
} as const);

export const fetchCardsTC = (): AppThunk => async (dispatch, getState: () => AppStateType) => {
    const {
        cardsPack_id,
        page,
        pageCount,
        packUserId,
        cardQuestion,
        cardAnswer,
        min,
        max,
        sortCards
    } = getState().cardPack;

    const params = {cardsPack_id, page, pageCount, packUserId, cardQuestion, cardAnswer, min, max, sortCards};

    dispatch(setAppStatusAC('loading'));

    try {
        const res = await cardNameAPI.getCards(params);
        dispatch(getCardsNameData(res.data));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message));
        }
    } finally {
        dispatch(setAppStatusAC('idle'));
    }
}

export const createCard = (data: CreateCardType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));

    try {
        await cardNameAPI.createCard(data);
        dispatch(fetchCardsTC());
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message));
            dispatch(setAppStatusAC('idle'));
        }
    }
}

export const removeCardTC = (id: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));

    try {
        await cardNameAPI.deleteCard(id);
        dispatch(fetchCardsTC());
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
            dispatch(setAppStatusAC('idle'));
        }
    }
}

export const updateCard = (data: UpdateCardType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));

    try {
        await cardNameAPI.updateCard(data);
        dispatch(fetchCardsTC());
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message));
            dispatch(setAppStatusAC('idle'));
        }
    }
};

export type CardsNameStateType = PackResponseType & {
    cardsPack_id: string
    cardQuestion?: string
    packName: string
    cardId: string
    cardAnswer: string
    sortCards: string
    min: number
    max: number
}

export type CardsNameActionsType =
    | ReturnType<typeof getCardsNameData>
    | ReturnType<typeof setSearchQuestion>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof setCardsPageCount>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setUserCardId>
    | ReturnType<typeof setUserCardName>
    | ReturnType<typeof setCardId>
    | ReturnType<typeof setSortCards>

