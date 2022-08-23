import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {loginReducer, loginWatcherSaga} from '../features/login/reducer/loginReducer';
import {cardsNameReducer} from '../features/packName/reducer/packCardReducer';
import {packsListReducer} from '../features/packsList/packsListReducer';
import {tablePacksReducer} from '../features/packsList/tablePacks/tablePacksReducer';
import {recoveryPasswordReducer} from '../features/recoveryPassword/reducer/recoveryPasswordReducer';
import {registrationReducer} from '../features/registration/reducer/registrationReducer';
import {setPasswordReducer} from '../features/setPassword/reducer/setPasswordReducer';
import {appReducer, appWatcherSaga} from './reducer/app-reducer';
import {learnPackReducer} from '../features/packsList/learnPack/learnPackReducer';
import {usersReducer} from '../features/users/usersReducer';
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
        appWatcherSaga(),
        loginWatcherSaga(),
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