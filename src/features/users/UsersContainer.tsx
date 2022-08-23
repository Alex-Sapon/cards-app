import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {getUsers} from './usersReducer';
import {PATH} from '../../enums/path';
import {Users} from './users/Users';
import {useAppDispatch, useAppSelector} from '../../assets/utils/hooks';

export const UsersContainer = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const page = useAppSelector(state => state.usersPage.usersParams.page);
    const pageCount = useAppSelector(state => state.usersPage.usersParams.pageCount);
    const userName = useAppSelector(state => state.usersPage.usersParams.userName);

    useEffect(() => {
        dispatch(getUsers());
    }, [page, pageCount, userName])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return <Users/>
}