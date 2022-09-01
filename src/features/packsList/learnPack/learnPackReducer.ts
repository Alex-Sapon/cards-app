import {CardType, PackResponseType} from '../../cardsList/api/apiCardsList';
import {apiLearnPack, UpdateGradeResponseType, UpdateGradeType} from './apiLearnPack';
import {AxiosError, AxiosResponse} from 'axios';
import {setAppError, setAppStatus} from '../../../app';
import {call, put, takeEvery} from 'redux-saga/effects';
import {ErrorData} from '../../users/api/apiUsers';

const initial: StateType = {
    cards: [] as CardType[],
    card: {} as CardType,
}

export const learnPackReducer = (state: StateType = initial, action: ActionsType): StateType => {
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
    try {
        yield put(setAppStatus('loading'));
        const res: AxiosResponse<PackResponseType> = yield call(apiLearnPack.getCards, id);
        yield put(setCards(res.data.cards));
    } catch (e) {
        const err = e as AxiosError<ErrorData>;
        yield put(setAppError(err.response ? err.response.data.error : err.message));
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* updateGradePackSaga({data}: ReturnType<typeof updateGradePack>) {
    try {
        yield put(setAppStatus('loading'));
        const res: AxiosResponse<UpdateGradeResponseType> = yield call(apiLearnPack.updateGrade, data);
        yield put(updateCardsPack(res.data));
    } catch (e) {
        const err = e as AxiosError<ErrorData>;
        yield put(setAppError(err.response ? err.response.data.error : err.message));
    } finally {
        yield put(setAppStatus('idle'));
    }
}

export function* learnPackWatcher() {
    yield takeEvery('LEARN-PACK/GET-CARDS-PACK', getCardsPackSaga);
    yield takeEvery('LEARN-PACK/UPDATE-GRADE-PACK', updateGradePackSaga);
}

export type ActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof updateCardsPack>
    | ReturnType<typeof setCardPack>

type StateType = {
    cards: CardType[]
    card: CardType
}