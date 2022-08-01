import {
    recoveryPasswordReducer,
    RecoveryPasswordStateType,
    setEmail,
    setIsSendEmail
} from '../reducer/recoveryPasswordReducer';


let startState: RecoveryPasswordStateType;


beforeEach( () => {
    startState = {
        email: 'example@mail.ru',
        isSendEmail: false
    }
} )

//test for RECOVERY-PASSWORD/SET-IS-SEND-EMAIL
test('correct isSendEmail should be set', () => {

    const action = setIsSendEmail(true);

    const endState = recoveryPasswordReducer(startState, action)

    expect(endState.isSendEmail).toBe(true);
})

//test for RECOVERY-PASSWORD/SET-EMAIL
test('correct data should be set', () => {

    const action = setEmail('newEmail@mail.ru');

    const endState = recoveryPasswordReducer(startState, action)

    expect(endState.email).toBe('newEmail@mail.ru');
})