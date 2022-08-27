import {AppStateType} from '../../../app/store';
import {StateType as TablePacksType} from './tablePacksReducer';

export const selectTablePacks = (state: AppStateType): TablePacksType => state.tablePacks;