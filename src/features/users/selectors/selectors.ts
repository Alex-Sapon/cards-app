import {AppStateType} from '../../../app/store';

export const selectUsersParams = (state: AppStateType) => state.usersPage.usersParams;
export const selectUsersPage = (state: AppStateType) => state.usersPage.usersParams.page;
export const selectUsersPageCount = (state: AppStateType) => state.usersPage.usersParams.pageCount;
export const selectUserName = (state: AppStateType) => state.usersPage.usersParams.userName;
