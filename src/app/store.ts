import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {loginReducer, loginWatcher} from '../features/login/reducer/loginReducer';
import {cardsNameReducer, packCardWatcher} from '../features/packName/reducer/packCardReducer';
import {packsListReducer, packsListWatcher} from '../features/packsList/packsListReducer';
import {tablePacksReducer, tablePacksWatcher} from '../features/packsList/tablePacks/tablePacksReducer';
import {
    recoveryPasswordReducer,
    recoveryPasswordWatcher
} from '../features/recoveryPassword/reducer/recoveryPasswordReducer';
import {registrationReducer} from '../features/registration/reducer/registrationReducer';
import {setPasswordReducer} from '../features/setPassword/reducer/setPasswordReducer';
import {appReducer, appWatcher} from './reducer/app-reducer';
import {learnPackReducer, learnPackWatcher} from '../features/packsList/learnPack/learnPackReducer';
import {usersReducer, usersWatcher} from '../features/users/usersReducer';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    setPassword: setPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    registration: registrationReducer,
    packList: packsListReducer,
    tablePacks: tablePacksReducer,
    cardPack: cardsNameReducer,
    learnPack: learnPackReducer,
    usersPage: usersReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
    yield all([
        appWatcher(),
        loginWatcher(),
        tablePacksWatcher(),
        packsListWatcher(),
        usersWatcher(),
        packCardWatcher(),
        learnPackWatcher(),
        recoveryPasswordWatcher(),
    ])
}

export type AppStateType = ReturnType<typeof rootReducer>;

// export type ActionsType =
//     | LoginActionsType
//     | AppActionsType
//     | RecoveryPasswordActionsType
//     | SetNewPasswordActionsType
//     | RegistrationActionsType
//     | PacksListActionsType
//     | TablePacksActionsType
//     | CardsNameActionsType
//     | LearnPackActionsType
//     | UsersActionsType


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;

// @ts-ignore
window.store = store;