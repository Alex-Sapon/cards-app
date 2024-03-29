import {setAppStatus} from '../../../app';
import {AxiosError, AxiosResponse} from 'axios';
import {cardsListAPI, CardType, CreateCardType, PackResponseType, UpdateCardType} from '../api/apiCardsList';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {selectCardPack} from '../selectors';
import {handleAppError} from '../../../assets/utils';

const initial: StateType = {
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

export const cardsListReducer = (state: StateType = initial, action: ActionsType): StateType => {
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
    userId
} as const);

export const setUserCardName = (packName: string) => ({
    type: 'CARDS-NAME/SET-USER-PACK-NAME',
    packName
} as const);

export const setCardsNameData = (data: PackResponseType) => ({
    type: 'CARDS-NAME/SET-CARDS-PARAMS',
    data
} as const);

export const setCardsPage = (page: number) => ({
    type: 'CARDS-NAME/SET-CARDS-PAGE',
    page
} as const);

export const setCardsPageCount = (pageCount: number) => ({
    type: 'CARDS-NAME/SET-CARDS-PAGE-COUNT',
    pageCount
} as const);

export const setCardsTotalCount = (cardsTotalCount: number) => ({
    type: 'CARDS-NAME/SET-CARDS-TOTAL-COUNT',
    cardsTotalCount,
} as const);

export const setCardId = (cardId: string) => ({type: 'CARDS-NAME/SET-CARD-ID', cardId} as const);

export const setSortCards = (sortCards: string) => ({type: 'CARDS-NAME/SET-SORT-CARDS', sortCards} as const);

export const fetchCards = () => ({type: 'PACK-CARD/FETCH-PACK-CARDS'} as const);

export const createCard = (data: CreateCardType) => ({type: 'PACK-CARD/CREATE-CARD', data} as const);

export const removeCard = (id: string) => ({type: 'PACK-CARD/REMOVE-CARD', id} as const);

export const updateCard = (data: UpdateCardType) => ({type: 'PACK-CARD/UPDATE-CARD', data} as const);

export function* fetchCardsSaga() {
    const {
        cardsPack_id,
        page,
        pageCount,
        cardQuestion,
        cardAnswer,
        min,
        max,
        sortCards
    }: StateType = yield select(selectCardPack);

    try {
        yield put(setAppStatus('loading'));
        const res: AxiosResponse<PackResponseType> = yield call(cardsListAPI.getCards, {
            cardsPack_id,
            page,
            pageCount,
            cardQuestion,
            cardAnswer,
            min,
            max,
            sortCards,
        });

        yield put(setCardsNameData(res.data));
    } catch (e) {
        yield handleAppError(e as AxiosError)
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* createCardSaga({data}: ReturnType<typeof createCard>) {
    try {
        yield put(setAppStatus('loading'));
        yield call(cardsListAPI.createCard, data);
        yield put(fetchCards());
    } catch (e) {
        yield handleAppError(e as AxiosError);
        yield put(setAppStatus('idle'));
    }
}

export function* removeCardSaga({id}: ReturnType<typeof removeCard>) {
    try {
        yield put(setAppStatus('loading'));
        yield call(cardsListAPI.deleteCard, id);
        yield put(fetchCards());
    } catch (e) {
        yield handleAppError(e as AxiosError);
        yield put(setAppStatus('idle'));
    }
}

export function* updateCardSaga({data}: ReturnType<typeof updateCard>) {
    try {
        yield put(setAppStatus('loading'));
        yield call(cardsListAPI.updateCard, data);
        yield put(fetchCards());
    } catch (e) {
        yield handleAppError(e as AxiosError);
        yield put(setAppStatus('idle'));
    }
}

export function* cardsListWatcher() {
    yield takeEvery('PACK-CARD/FETCH-PACK-CARDS', fetchCardsSaga);
    yield takeEvery('PACK-CARD/CREATE-CARD', createCardSaga);
    yield takeEvery('PACK-CARD/REMOVE-CARD', removeCardSaga);
    yield takeEvery('PACK-CARD/UPDATE-CARD', updateCardSaga);
}

export type StateType = PackResponseType & {
    cardsPack_id: string
    cardQuestion?: string
    packName: string
    cardId: string
    cardAnswer: string
    sortCards: string
    min: number
    max: number
}

export type ActionsType =
    | ReturnType<typeof setCardsNameData>
    | ReturnType<typeof setSearchQuestion>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof setCardsPageCount>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setUserCardId>
    | ReturnType<typeof setUserCardName>
    | ReturnType<typeof setCardId>
    | ReturnType<typeof setSortCards>

