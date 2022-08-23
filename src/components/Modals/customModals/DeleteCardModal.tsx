import {BasicModal, ModalPropsType} from '../BasicModal';
import Button from '../../../common/button/Button';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import {removeCardTC} from '../../../features/packName/reducer/packCardReducer';
import Cover from '../../../assets/images/cover.jpg';
import {useAppDispatch, useAppSelector} from '../../../assets/utils/hooks';

export const DeleteCardModal = ({onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const cardId = useAppSelector(state => state.cardPack.cardId);
    const card = useAppSelector(state => state.cardPack.cards.find(card => card._id === cardId));

    const deleteCard = () => {
        dispatch(removeCardTC(cardId));
        onClose();
    };

    return (
        <BasicModal onClose={onClose}>
            <div className={styles.header}>
                <h3>Delete card</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}/>
            <img src={card?.questionImg ? card?.questionImg : Cover} alt="Cover" className={styles.image}/>
            <p className={styles.description}>
                Do you really want to remove Card Name - <b>{card?.question}</b>? All cards will be excluded from this course.
            </p>
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={deleteCard}>Delete</Button>
            </div>
        </BasicModal>
    )
};