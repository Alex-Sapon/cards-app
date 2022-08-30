import {instance} from '../../../api/instance';
import {AxiosResponse} from 'axios';
import {PackResponseType} from '../../cardsList/apiCardsList/apiCardsList';

export const apiLearnPack = {
    getCards(cardsPack_id: string) {
        return instance.get<any, AxiosResponse<PackResponseType>, { cardsPack_id: string }>('cards/card', {
            params: {cardsPack_id, pageCount: 1000}
        });
    },
    updateGrade(data: UpdateGradeType) {
        return instance.put<any, AxiosResponse<UpdateGradeResponseType>, UpdateGradeType>('cards/grade', data);
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