import {setNewPassword, setPasswordReducer, StateType} from '../reducer/setPasswordReducer';

let startState: StateType;

beforeEach(() => {
    startState = {
        isUpdatePassword: false
    }
})

test('correct isUpdatePassword should be set', () => {
    const action = setNewPassword(true);

    const endState = setPasswordReducer(startState, action)

    expect(endState.isUpdatePassword).toBe(true);
})
