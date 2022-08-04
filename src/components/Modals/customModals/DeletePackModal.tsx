import React from 'react';
import {BasicModal, ModalPropsType} from '../BasicModal';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../../common/button/Button';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {deleteUpdateCardsPack} from '../../../features/packsList/tablePacks/tablePacksReducer';

export const DeletePackModal = ({onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const {packId, packName} = useAppSelector(state => state.packList);

    const handleDeletePack = () => {
        dispatch(deleteUpdateCardsPack(packId));
        onClose();
    }

    return (
        <BasicModal onClose={onClose}>
            <div className={styles.header}>
                <h3>Delete pack</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}/>
            <p className={styles.description}>
                Do you really want to remove Pack Name - <b>{packName}</b>? All cards will be excluded from this course.
            </p>
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDeletePack}>Delete</Button>
            </div>
        </BasicModal>
    )
};