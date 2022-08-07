import {AxiosResponse} from 'axios';
import {instance} from '../../../api/instance';

export const tablePacksAPI = {
    createPack(data: CreateCardsPackType) {
        return instance.post<any, AxiosResponse<{ newCardsPack: PackType }>, CreateCardsPackType>(`cards/pack`, data);
    },
    deletePack(id: string) {
        return instance.delete<any, AxiosResponse<{ deletedCardsPack: PackType }>, { id: string }>(`cards/pack?id=${id}`);
    },
    updatePack(data: { cardsPack: PackType }) {
        return instance.put<any, AxiosResponse<{ updatedCardsPack: PackType }>, { cardsPack: PackType }>(`cards/pack`, data);
    },
}

export type PackType = {
    _id: string
    user_id?: string
    user_name?: string
    private?: boolean
    name: string
    path?: string
    grade?: number
    deckCover?: string
    shots?: number
    cardsCount?: number
    type?: string
    rating?: number
    created?: Date
    updated?: Date
    more_id?: string
    __v?: number
}

export type CreateCardsPackType = {
    cardsPack: {
        name: string
        deckCover: string
        private: boolean
    }
}