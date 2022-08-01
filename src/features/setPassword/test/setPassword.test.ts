import {setNewPassword, setPasswordReducer, SetPasswordStateType} from '../reducer/setPasswordReducer';


let startState: SetPasswordStateType;


beforeEach( () => {
    startState = {
     isUpdatePassword: false
    }
} )

//test for SET-PASSWORD/UPDATE-PASSWORD
test('correct isUpdatePassword should be set', () => {

    const action = setNewPassword(true);

    const endState = setPasswordReducer(startState, action)

    expect(endState.isUpdatePassword).toBe(true);
})
