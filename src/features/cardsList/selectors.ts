import {AppStateType} from '../../app/store';

export const selectCardPack = (state: AppStateType) => state.cardList;