import {BasicModal, ModalPropsType} from '../BasicModal';
import * as React from 'react';
import styles from './CustomModal.module.css';
import {TextField} from '@mui/material';
import Button from '../../../common/button/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const EditPackModal = ({isOpen, onClose}: ModalPropsType) => {
    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.header}>
                <h3>Edit pack</h3>
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