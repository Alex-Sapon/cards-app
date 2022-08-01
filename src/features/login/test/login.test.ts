import {LoginDataUserType, loginReducer, setLoginData} from '../reducer/loginReducer';

let startState: LoginDataUserType;


beforeEach( () => {
    startState = {
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
} )

//test for LOGIN/SET-LOGIN-DATA-USER
test('correct data should be set', () => {

    const action = setLoginData({
        _id: '123',
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
    });

    const endState = loginReducer(startState, action)

    expect(endState._id).toBe('123');
})

//test for LOGIN/SET-IS-LOGGED-IN
test('correct login data should be set', () => {

    const action = setLoginData({
        _id: '123',
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
    });

    const endState = loginReducer(startState, action)

    expect(endState._id).toBe('123');
})
