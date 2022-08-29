import {AppStateType} from '../../../app/store';
import {StateType as TablePacksType} from './tablePacksReducer';
import {PackType} from '../apiPacksList';

export const selectTablePacks = (state: AppStateType): TablePacksType => state.tablePacks;
export const selectCardPacks = (state: AppStateType): PackType[] => state.packList.cardPacks;
export const selectCardPacksTotalCount = (state: AppStateType): number => state.packList.cardPacksTotalCount;
export const selectPageCount = (state: AppStateType): number => state.tablePacks.pageCount;
export const selectPage = (state: AppStateType): number => state.tablePacks.page;
export const selectPackName = (state: AppStateType): string => state.tablePacks.packName;
export const selectSortPackName = (state: AppStateType): string => state.tablePacks.sortPacks;
export const selectUserId = (state: AppStateType): string => state.tablePacks.user_id;
export const selectMinGrade = (state: AppStateType): number => state.tablePacks.min;
export const selectMaxGrade = (state: AppStateType): number => state.tablePacks.max;