import {BasicModal, ModalPropsType} from '../BasicModal';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../../common/button/Button';
import * as React from 'react';

export const DeletePackModal = ({isOpen, onClose}: ModalPropsType) => {
    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.header}>
                <h3>Delete pack</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}></div>
            <p className={styles.description}>
                Do you really want to remove <b>Pack Name -</b> Name Pack? All cards will be excluded from this course.
            </p>
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button>Delete</Button>
            </div>
        </BasicModal>
    )
};