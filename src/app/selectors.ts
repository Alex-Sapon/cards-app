import {AppStateType} from './store';
import {RequestStatusType} from './reducer/appReducer';

export const selectIsInitialized = (state: AppStateType): boolean => state.app.isInitialized;
export const selectAppStatus = (state: AppStateType): RequestStatusType => state.app.status;