import React, {useEffect} from 'react';
import styles from './tableCardName.module.css';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {fetchCardsTC} from '../reducer/packCardReducer';
import {TableCard} from './TableCard';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../enums/path';

export const TableCardName = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const cardsPackId = useAppSelector(state => state.cardPack.cardsPack_id);
    const page = useAppSelector(state => state.cardPack.page);
    const pageCount = useAppSelector(state => state.cardPack.pageCount);
    const cardQuestion = useAppSelector(state => state.cardPack.cardQuestion);
    const cardAnswer = useAppSelector(state => state.cardPack.cardAnswer);
    const sortCards = useAppSelector(state => state.cardPack.sortCards);
    const min = useAppSelector(state => state.cardPack.min);
    const max = useAppSelector(state => state.cardPack.max);

    useEffect(() => {
        if (cardsPackId) {
            dispatch(fetchCardsTC());
        }
    }, [cardsPackId, page, pageCount, cardQuestion, cardAnswer, sortCards, min, max])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    if (!cardsPackId) return <Navigate to={PATH.PACKS + '/' + PATH.PACKS_LIST}/>

    return (
        <div className={styles.container}>
            <TableCard/>
        </div>
    )
}