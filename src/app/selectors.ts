import {AppStateType} from './store';

export const selectIsInitialized = (state: AppStateType): boolean => state.app.isInitialized;