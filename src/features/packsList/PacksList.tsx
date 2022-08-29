import React, {useEffect} from 'react';
import styles from './PacksList.module.css';
import {ShowPacks} from './showPacks';
import {TablePacks} from './tablePacks/TablePacks';
import {PATH} from '../../enums/path';
import {Navigate} from 'react-router-dom';
import {fetchCardPacks} from './packsListReducer';
import {useAppDispatch, useAppSelector} from '../../assets/utils/hooks';
import {selectIsLoggedIn} from '../login';
import {
    selectMaxGrade, selectMinGrade, selectPackName, selectPage, selectPageCount, selectSortPackName, selectUserId
} from './tablePacks';

export const PacksList = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const page = useAppSelector(selectPage);
    const pageCount = useAppSelector(selectPageCount);
    const searchPackName = useAppSelector(selectPackName);
    const sortPackName = useAppSelector(selectSortPackName);
    const userId = useAppSelector(selectUserId);
    const min = useAppSelector(selectMinGrade);
    const max = useAppSelector(selectMaxGrade);

    useEffect(() => {
        dispatch(fetchCardPacks());
    }, [page, pageCount, sortPackName, searchPackName, userId, min, max, dispatch]);

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return (
        <div className={styles.container}>
            <ShowPacks/>
            <TablePacks/>
        </div>
    )
};