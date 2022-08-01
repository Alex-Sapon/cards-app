import {AxiosResponse} from 'axios';
import {instance} from '../../api/instance';

export const packsListApi = {
    getPacks(data: PacksParamsType) {
        return instance.get<PacksParamsResponseType, AxiosResponse<PacksParamsResponseType>, PacksParamsType>(`cards/pack`, {params: data});
    }
}

//types
export type PacksParamsType = {
    packName: string
    min?: number
    max?: number
    sortPacks: string
    page: number
    pageCount: number
    user_id?: string
}

export type PacksParamsResponseType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: false
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}