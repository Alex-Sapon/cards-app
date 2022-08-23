import {CardType} from '../../packName/apiCardName/apiPackName';
import {AppThunk} from '../../../app/store';
import {learnPackAPI, UpdateGradeResponseType, UpdateGradeType} from './learnPack-api';
import {AxiosError} from 'axios';
import {setAppError, setAppStatus} from '../../../app/reducer/app-reducer';

const initState: LearnPackStateType = {
    cards: [] as CardType[],
    card: {} as CardType,
}

export const learnPackReducer = (state: LearnPackStateType = initState, action: LearnPackActionsType): LearnPackStateType => {
    switch (action.type) {
        case 'LEARN-PACK/SET-CARDS-PACK':
            return {...state, cards: action.cards};
        case 'LEARN-PACK/UPDATE-CARD-PACK':
            return {...state, cards: state.cards.map(card => card._id === action.data.updatedGrade.card_id
                    ? {...card, grade: action.data.updatedGrade.grade} : card)};
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

export const getCardsPack = (id: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'));

    learnPackAPI.getCards(id)
        .then(res => {
            dispatch(setCards(res.data.cards));
        })
        .catch((e: AxiosError<{error: string}>) => {
            dispatch(setAppError(e.response ? e.response.data.error : e.message));
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        })
}

export const updateGradePack = (data: UpdateGradeType): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'));

    learnPackAPI.updateGrade(data)
        .then(res => {
            dispatch(updateCardsPack(res.data));
        })
        .catch((e: AxiosError<{error: string}>) => {
            dispatch(setAppError(e.response ? e.response.data.error : e.message));
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        })
}

export type LearnPackActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof updateCardsPack>
    | ReturnType<typeof setCardPack>

type LearnPackStateType = {
    cards: CardType[]
    card: CardType
}