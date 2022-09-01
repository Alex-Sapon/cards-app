import {AppStateType} from '../../../app/store';

export const selectIsLoggedIn = (state: AppStateType): boolean => state.login.isLoggedIn;
export const selectLoginId = (state: AppStateType): string => state.login._id;