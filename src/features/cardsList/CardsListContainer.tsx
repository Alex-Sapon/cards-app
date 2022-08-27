import React, {useEffect} from 'react';
import styles from './CardsList.module.css';
import {fetchCards} from './reducer/cardsListReducer';
import {CardsList} from './CardsList';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../enums/path';
import {useAppDispatch, useAppSelector} from '../../assets/utils/hooks';
import {selectIsLoggedIn} from '../login';

export const CardsListContainer = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const cardsPackId = useAppSelector(state => state.cardList.cardsPack_id);
    const page = useAppSelector(state => state.cardList.page);
    const pageCount = useAppSelector(state => state.cardList.pageCount);
    const cardQuestion = useAppSelector(state => state.cardList.cardQuestion);
    const cardAnswer = useAppSelector(state => state.cardList.cardAnswer);
    const sortCards = useAppSelector(state => state.cardList.sortCards);
    const min = useAppSelector(state => state.cardList.min);
    const max = useAppSelector(state => state.cardList.max);

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