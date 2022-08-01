import {AxiosResponse} from 'axios';
import {instance} from '../../../api/instance';

export const cardNameAPI = {
	getCard(data: CardParamsType) {
		return instance.get<any, AxiosResponse<CardsTypeResponseType>, CardParamsType>('cards/card', {params: data});
	},
	createCard(data: CreateCardType) {
		return instance.post<any, AxiosResponse<CardsTypeResponseType>, { card: CreateCardType }>('cards/card', {card: data});
	},
	deleteCard(_id: string) {
		return instance.delete<any, AxiosResponse<CardsTypeResponseType>, { _id: string }>('cards/card', {params: {id: _id}});
	},
	updateCard(data: PutParamsType) {
		return instance.put<any, AxiosResponse<CardsTypeResponseType>, { card: PutParamsType }>('cards/card', {card: data});
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

export type PutParamsType = {
	_id: string
	question: string
	comments?: string
}

