import {AppThunk} from '../../../app/store';
import {authAPI, ForgotPasswordPayloadType} from '../../../api/auth-api';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';

const initialState: RecoveryPasswordStateType = {
	email: 'example@mail.com',
	isSendEmail: false,
}

export const recoveryPasswordReducer = (state: RecoveryPasswordStateType = initialState, action: RecoveryPasswordActionsType): RecoveryPasswordStateType => {
	switch (action.type) {
		case 'RECOVERY-PASSWORD/SET-IS-SEND-EMAIL':
			return {...state, isSendEmail: action.isSend};;
		case 'RECOVERY-PASSWORD/SET-EMAIL':
			return {...state, email: action.email};
		default:
			return state;
	}
};

//actions
export const setIsSendEmail = (isSend: boolean) => ({type: 'RECOVERY-PASSWORD/SET-IS-SEND-EMAIL', isSend,} as const);
export const setEmail = (email: string) => ({type: 'RECOVERY-PASSWORD/SET-EMAIL', email,} as const);

//thunks
export const forgotPass = (email: string): AppThunk => dispatch => {
	dispatch(setAppStatusAC('loading'));

	const data: ForgotPasswordPayloadType = {
		email: email,
		from: 'alexsapon@gmail.com',
		message: `
                <div style="background-color: lime; padding: 15px">password recovery link: 
                    <a href='https://alex-sapon.github.io/cards/#/set-new-password/$token$'> link</a>
                </div>
                `,
	}

	authAPI.forgotPassword(data)
		.then(() => {
			dispatch(setIsSendEmail(true));
			dispatch(setEmail(email));
		})
		.catch((e) => {
			dispatch(setAppErrorAC(e.message));
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'));
		})
};

//types
export type RecoveryPasswordActionsType =
	| ReturnType<typeof setIsSendEmail>
	| ReturnType<typeof setEmail>
export type RecoveryPasswordStateType = {
	email: string
	isSendEmail: boolean
}
