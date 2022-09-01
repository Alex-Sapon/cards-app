import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {getUsers} from './reducer/usersReducer';
import {PATH} from '../../enums/path';
import {Users} from './users';
import {useAppDispatch, useAppSelector} from '../../assets/utils/hooks';
import {selectIsLoggedIn} from '../login';
import {selectUserName, selectUsersPage, selectUsersPageCount} from './selectors';

export const UsersContainer = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const page = useAppSelector(selectUsersPage);
    const pageCount = useAppSelector(selectUsersPageCount);
    const userName = useAppSelector(selectUserName);

    useEffect(() => {
        dispatch(getUsers());
    }, [page, pageCount, userName, dispatch])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return <Users/>
}