import {AppStateType} from '../../app/store';

export const selectIsLoggedIn = (state: AppStateType): boolean => state.login.isLoggedIn;