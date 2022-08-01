import {BasicModal, ModalPropsType} from '../BasicModal';
import Button from '../../../common/button/Button';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import {setCardAnswer, setCardId, setCardQuestion} from '../../../features/packName/reducer/packCardReducer';

export const DeleteCardModal = ({isOpen, onClose}: ModalPropsType) => {
    // const changeCard = () => {
    //     dispatch(setCardId(_id))
    //     dispatch(setCardQuestion(question))
    //     dispatch(setCardAnswer(answer))
    // };
    //
    // const removeCard = () => {
    //     dispatch(setCardId(_id))
    //     dispatch(setCardQuestion(question))
    // };

    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.header}>
                <h3>Delete card</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}></div>
            <p className={styles.description}>
                Do you really want to remove <b>Card Name -</b> Name Pack? All cards will be excluded from this course.
            </p>
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button>Delete</Button>
            </div>
        </BasicModal>
    )
};