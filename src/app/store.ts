import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {loginReducer, loginWatcher} from '../features/login';
import {cardsListReducer, cardsListWatcher} from '../features/cardsList';
import {packsListReducer, packsListWatcher} from '../features/packsList';
import {tablePacksReducer, tablePacksWatcher} from '../features/packsList/tablePacks';
import {recoveryPasswordReducer, recoveryPasswordWatcher} from '../features/recoveryPassword';
import {registrationReducer, userRegisterWatcher} from '../features/registration';
import {setPasswordReducer, updateNewPasswordWatcher} from '../features/setPassword';
import {appReducer, appWatcher} from './reducer/appReducer';
import {learnPackReducer, learnPackWatcher} from '../features/packsList/learnPack';
import {usersReducer, usersWatcher} from '../features/users';
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
    cardList: cardsListReducer,
    learnPack: learnPackReducer,
    usersPage: usersReducer,
});

const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
    yield all([
        appWatcher(),
        loginWatcher(),
        tablePacksWatcher(),
        packsListWatcher(),
        usersWatcher(),
        cardsListWatcher(),
        learnPackWatcher(),
        recoveryPasswordWatcher(),
        userRegisterWatcher(),
        updateNewPasswordWatcher(),
    ])
}

export type AppStateType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;

// @ts-ignore
window.store = store;