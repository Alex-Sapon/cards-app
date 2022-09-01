import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './App.module.css';
import {Login, selectIsLoggedIn} from '../features/login';
import {Registration} from '../features/registration';
import {Profile} from '../features/profile';
import {SetPassword} from '../features/setPassword';
import {RecoveryPassword} from '../features/recoveryPassword';
import {Error404} from '../components/error404';
import {PATH} from '../enums/path';
import {useEffect} from 'react';
import {initializeApp} from './reducer/appReducer';
import {Navbar} from '../components/navbar';
import {ErrorSnackbar} from '../components/errorSnackbar';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import {PacksList} from '../features/packsList';
import {CardsListContainer} from '../features/cardsList';
import {LearnPack} from '../features/packsList/learnPack';
import {UsersContainer, UserProfile} from '../features/users';
import {useAppDispatch, useAppSelector} from '../assets/utils/hooks';
import {selectIsInitialized} from './';

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
                        <Route path={PATH.CARDS} element={<CardsListContainer/>}/>
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