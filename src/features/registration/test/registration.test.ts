import {registrationReducer, StateType, setRegisterMessage} from '../reducer/registrationReducer';

let startState: StateType;

beforeEach( () => {
    startState = {
        message: 'initial message'
    }
} )

test('correct message should be set to SnackBar', () => {
    const action = setRegisterMessage('You have successfully registered');

    const endState = registrationReducer(startState, action)

    expect(endState.message).toBe('You have successfully registered');
})