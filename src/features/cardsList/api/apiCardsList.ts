import {AxiosResponse} from 'axios';
import {instance} from '../../../api/instance';

export const cardsListAPI = {
    getCards(data: CardParamsType) {
        return instance.get<PackResponseType, AxiosResponse<PackResponseType>, CardParamsType>('cards/card', {params: data});
    },
    createCard(data: CreateCardType) {
        return instance.post<any, AxiosResponse<PackResponseType>, { card: CreateCardType }>('cards/card', {card: data});
    },
    deleteCard(_id: string) {
        return instance.delete<any, AxiosResponse<PackResponseType>, { _id: string }>('cards/card', {params: {id: _id}});
    },
    updateCard(data: UpdateCardType) {
        return instance.put<any, AxiosResponse<PackResponseType>, { card: UpdateCardType }>('cards/card', {card: data});
    },
}

export type CardParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type PackResponseType = {
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
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type CreateCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    questionImg?: string
    answerImg?: string
    comments?: string
}

