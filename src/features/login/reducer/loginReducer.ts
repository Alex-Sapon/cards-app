import {AxiosError} from 'axios';
import {authAPI, LoginType, UserResponseType} from '../../../api/authAPI';
import {AppThunk} from '../../../app/store';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';

const initialState: LoginDataUserType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
    __v: 0,
    token: '',
    tokenDeathTime: 0,
    isLoggedIn: false,
}

export type LoginStateType = typeof initialState;

export const loginReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET-LOGIN-DATA-USER':
            return {...state, ...action.data};
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn};
        default:
            return state;
    }
};

export const setLoginData = (data: UserResponseType) => ({
    type: 'LOGIN/SET-LOGIN-DATA-USER',
    data,
} as const);

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
    type: 'LOGIN/SET-IS-LOGGED-IN',
    isLoggedIn,
} as const);

export const login = (data: LoginType): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));

    authAPI.login(data)
        .then(res => {
            dispatch(setLoginData(res.data));
            dispatch(setIsLoggedIn(true));
        })
        .catch((e: AxiosError<{ error: string }>) => {
            const error = (e.response && e.response.data) ? e.response.data.error : e.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
};

export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));

    authAPI.logout()
        .then(() => {
            dispatch(setIsLoggedIn(false));
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(setAppErrorAC(e.message ? e.message : 'Some error occurred'));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
}

export const updateUserDataTC = (name: string, avatar: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));

    authAPI.updateProfile({name, avatar})
        .then(res => {
            dispatch(setLoginData(res.data.updatedUser));
        })
        .catch((e: AxiosError<{ error: string }>) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
}

export type LoginActionsType =
    | ReturnType<typeof setLoginData>
    | ReturnType<typeof setIsLoggedIn>

export type LoginDataUserType = UserResponseType & {
    isLoggedIn: boolean
}
