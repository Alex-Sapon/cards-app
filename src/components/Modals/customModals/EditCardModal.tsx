import {BasicModal, ModalPropsType} from '../BasicModal';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {TextField} from '@mui/material';
import Button from '../../../common/button/Button';
import * as React from 'react';

export const EditCardModal = ({isOpen, onClose}: ModalPropsType) => {
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
                <h3>Edit card</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}></div>
            <TextField variant="standard" label="Name pack" fullWidth className={styles.field}/>
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button>Edit pack</Button>
            </div>
        </BasicModal>
    )
};