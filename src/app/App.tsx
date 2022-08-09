import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './App.module.css';
import {Login} from '../features/login/Login';
import {Registration} from '../features/registration/Registration';
import {Profile} from '../features/profile/Profile';
import {SetPassword} from '../features/setPassword/SetPassword';
import {RecoveryPassword} from '../features/recoveryPassword/RecoveryPassword';
import {Error404} from '../components/error404/Error404';
import {PATH} from '../enums/path';
import {useEffect} from 'react';
import {AppStateType, useAppDispatch, useAppSelector} from './store';
import {initializeApp} from './reducer/app-reducer';
import {Navbar} from '../components/navbar/Navbar';
import {ErrorSnackbar} from '../components/errorSnackbar/ErrorSnackbar';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import {PacksList} from '../features/packsList/PacksList';
import {TableCardName} from '../features/packName/tableCardName/tableCardName';
import {LearnPack} from '../features/packsList/learnPack/LearnPack';
import {UsersContainer} from '../features/users/UsersContainer';
import {UserProfile} from '../features/users/user/User';

const selectIsInitialized = (state: AppStateType): boolean => state.app.isInitialized;
const selectIsLoggedIn = (state: AppStateType): boolean => state.login.isLoggedIn;

export const App = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const isInitialized = useAppSelector(selectIsInitialized);

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch]);

    if (!isInitialized) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30%'}}>
                <CircularProgress/>
            </Box>
        )
    }

    return (
        <>
            {isLoggedIn && <Navbar/>}
            <div className={styles.app_container}>
                <ErrorSnackbar/>
                <Routes>
                    <Route path={PATH.HOME} element={<Navigate to={PATH.LOGIN}/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                    <Route path={PATH.PACKS} element={<><Outlet/></>}>
                        <Route index element={<Navigate to={PATH.PACKS + '/' + PATH.PACKS_LIST}/>}/>
                        <Route path={PATH.PACKS_LIST} element={<PacksList/>}/>
                        <Route path={PATH.LEARN_PACK} element={<LearnPack/>}/>
                        <Route path={PATH.CARDS} element={<TableCardName/>}/>
                    </Route>
                    <Route path={PATH.USERS} element={<UsersContainer/>}/>
                    <Route path={PATH.USER} element={<UserProfile/>}/>
                    <Route path={PATH.PROFILE} element={<Profile/>}/>
                    <Route path={PATH.SET_PASS} element={<SetPassword/>}/>
                    <Route path={PATH.RECOVERY_PASS} element={<RecoveryPassword/>}/>
                    <Route path={PATH.PAGE_NOT_FOUND} element={<Error404/>}/>
                </Routes>
            </div>
        </>
    )
};