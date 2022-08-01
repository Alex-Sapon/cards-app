import {registrationReducer, RegistrationStateType, setRegisterMessageAC} from '../reducer/registrationReducer';

let startState: RegistrationStateType;


beforeEach( () => {
    startState = {
        message: 'initial message'
    }
} )

//test for REGISTRATION/SET-MESSAGE
test('correct message should be set to SnackBar', () => {

    const action = setRegisterMessageAC('You have successfully registered');

    const endState = registrationReducer(startState, action)

    expect(endState.message).toBe('You have successfully registered');
})