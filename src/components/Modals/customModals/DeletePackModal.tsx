import {BasicModal, ModalPropsType} from '../BasicModal';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../../common/button/Button';
import * as React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {deleteUpdateCardsPack} from '../../../features/packsList/tablePacks/tablePacksReducer';

export const DeletePackModal = ({isOpen, onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const {packId, packName} = useAppSelector(state => state.packList);
    const status = useAppSelector(state => state.app.status);

    const handleDeletePack = () => dispatch(deleteUpdateCardsPack(packId));

    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.header}>
                <h3>Delete pack</h3>
                <IconButton onClick={onClose} disabled={status === 'loading'}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}></div>
            <p className={styles.description}>
                Do you really want to remove <b>Pack Name - </b>{packName}? All cards will be excluded from this course.
            </p>
            <div className={styles.buttons}>
                <Button onClick={onClose} disabled={status === 'loading'}>Cancel</Button>
                <Button onClick={handleDeletePack} disabled={status === 'loading'}>Delete</Button>
            </div>
        </BasicModal>
    )
};