import {AppStateType} from '../../app/store';

export const selectCardPack = (state: AppStateType) => state.cardList;
export const selectCardPackId = (state: AppStateType) => state.cardList.cardsPack_id;
export const selectCardPage = (state: AppStateType) => state.cardList.page;
export const selectCardPageCount = (state: AppStateType) => state.cardList.pageCount;
export const selectCardQuestion = (state: AppStateType) => state.cardList.cardQuestion;
export const selectCardAnswer = (state: AppStateType) => state.cardList.cardAnswer;
export const selectSortCards = (state: AppStateType) => state.cardList.sortCards;
export const selectCardMin = (state: AppStateType) => state.cardList.min;
export const selectCardMax = (state: AppStateType) => state.cardList.max;