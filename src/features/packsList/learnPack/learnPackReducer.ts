import {CardType, PackResponseType} from '../../packName/apiCardName/apiPackName';
import {learnPackAPI, UpdateGradeResponseType, UpdateGradeType} from './learnPack-api';
import {AxiosError, AxiosResponse} from 'axios';
import {setAppError, setAppStatus} from '../../../app/reducer/app-reducer';
import {call, put, takeEvery} from 'redux-saga/effects';

const initial: LearnPackStateType = {
    cards: [] as CardType[],
    card: {} as CardType,
}

export const learnPackReducer = (state: LearnPackStateType = initial, action: LearnPackActionsType): LearnPackStateType => {
    switch (action.type) {
        case 'LEARN-PACK/SET-CARDS-PACK':
            return {...state, cards: action.cards};
        case 'LEARN-PACK/UPDATE-CARD-PACK':
            return {
                ...state, cards: state.cards.map(card => card._id === action.data.updatedGrade.card_id
                    ? {...card, grade: action.data.updatedGrade.grade} : card)
            };
        case 'LEARN-PACK/SET-CARD-PACK':
            return {...state, card: action.card};
        default:
            return state;
    }
}

export const setCards = (cards: CardType[]) => ({
    type: 'LEARN-PACK/SET-CARDS-PACK',
    cards,
} as const);

export const updateCardsPack = (data: UpdateGradeResponseType) => ({
    type: 'LEARN-PACK/UPDATE-CARD-PACK',
    data,
} as const);

export const setCardPack = (card: CardType) => ({
    type: 'LEARN-PACK/SET-CARD-PACK',
    card,
} as const);

export const getCardsPack = (id: string) => ({type: 'LEARN-PACK/GET-CARDS-PACK', id} as const);

export const updateGradePack = (data: UpdateGradeType) => ({type: 'LEARN-PACK/UPDATE-GRADE-PACK', data} as const);

export function* getCardsPackSaga({id}: ReturnType<typeof getCardsPack>) {
    yield put(setAppStatus('loading'));

    try {
        const res: AxiosResponse<PackResponseType> = yield call(learnPackAPI.getCards, id);
        yield put(setCards(res.data.cards));
    } catch (e) {
        const err = e as AxiosError<{ error: string }>;
        yield put(setAppError(err.response ? err.response.data.error : err.message));
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* updateGradePackSaga({data}: ReturnType<typeof updateGradePack>) {
    yield put(setAppStatus('loading'));

    try {
        const res: AxiosResponse<UpdateGradeResponseType> = yield call(learnPackAPI.updateGrade, data);
        yield put(updateCardsPack(res.data));
    } catch (e) {
        const err = e as AxiosError<{ error: string }>;
        yield put(setAppError(err.response ? err.response.data.error : err.message));
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* learnPackWatcher() {
    yield takeEvery('LEARN-PACK/GET-CARDS-PACK', getCardsPackSaga);
    yield takeEvery('LEARN-PACK/UPDATE-GRADE-PACK', updateGradePackSaga);
}

export type LearnPackActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof updateCardsPack>
    | ReturnType<typeof setCardPack>

type LearnPackStateType = {
    cards: CardType[]
    card: CardType
}