import {instance} from '../../../api/instance';
import {AxiosResponse} from 'axios';

export const learnPackAPI = {
    getCards(cardsPack_id: string) {
        return instance.get<CardsTypeResponseType, AxiosResponse<CardsTypeResponseType>, {cardsPack_id: string}>('cards/card', {
            params: {cardsPack_id, pageCount: 1000}
        });
    },
    updateGrade(data: UpdateGradeType) {
        return instance.put<UpdateGradeResponseType, AxiosResponse<UpdateGradeResponseType>, UpdateGradeType>('cards/grade', data);
    },
}

export type UpdateGradeType = {
    grade: number
    card_id: string
}

export type UpdateGradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}

export type CardsTypeResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    token: string
    tokenDeathTime: number
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}