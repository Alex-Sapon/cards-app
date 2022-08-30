import {AppStateType} from '../../../app/store';

export const selectLearnCards = (state: AppStateType) => state.learnPack.cards;
export const selectLearnCard = (state: AppStateType) => state.learnPack.card;