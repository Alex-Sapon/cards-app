import React, {useEffect} from 'react';
import styles from './CardsList.module.css';
import {fetchCards} from './reducer/cardsListReducer';
import {CardsList} from './CardsList';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../enums/path';
import {useAppDispatch, useAppSelector} from '../../assets/utils/hooks';
import {selectIsLoggedIn} from '../login';
import {
    selectCardPage, selectCardPageCount, selectCardQuestion, selectCardPackId,
    selectCardAnswer, selectSortCards, selectCardMin, selectCardMax
} from './selectors/selectors';

export const CardsListContainer = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const cardsPackId = useAppSelector(selectCardPackId);
    const page = useAppSelector(selectCardPage);
    const pageCount = useAppSelector(selectCardPageCount);
    const cardQuestion = useAppSelector(selectCardQuestion);
    const cardAnswer = useAppSelector(selectCardAnswer);
    const sortCards = useAppSelector(selectSortCards);
    const min = useAppSelector(selectCardMin);
    const max = useAppSelector(selectCardMax);

    useEffect(() => {
        if (cardsPackId) {
            dispatch(fetchCards());
        }
    }, [cardsPackId, page, pageCount, cardQuestion, cardAnswer, sortCards, min, max, dispatch])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    if (!cardsPackId) return <Navigate to={PATH.PACKS + '/' + PATH.PACKS_LIST}/>

    return (
        <div className={styles.container}>
            <CardsList/>
        </div>
    )
}