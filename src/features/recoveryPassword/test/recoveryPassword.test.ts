import {recoveryPasswordReducer, StateType, setEmail, setIsSendEmail} from '../reducer/recoveryPasswordReducer';

let startState: StateType;

beforeEach(() => {
    startState = {
        email: 'example@mail.ru',
        isSendEmail: false
    }
})

test('correct isSendEmail should be set', () => {
    const action = setIsSendEmail(true);

    const endState = recoveryPasswordReducer(startState, action)

    expect(endState.isSendEmail).toBe(true);
})

test('correct data should be set', () => {
    const action = setEmail('newEmail@mail.ru');

    const endState = recoveryPasswordReducer(startState, action)

    expect(endState.email).toBe('newEmail@mail.ru');
})