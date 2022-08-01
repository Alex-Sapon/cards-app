import {BasicModal, ModalPropsType} from '../BasicModal';
import Button from '../../../common/button/Button';
import TextField from '@mui/material/TextField';
import styles from './CustomModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

export const AddCardModal = ({isOpen, onClose}: ModalPropsType) => {
    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.header}>
                <h3>Add new card</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}></div>
            <TextField variant="standard" label="Question" fullWidth className={styles.field}/>
            <TextField
                variant="outlined"
                label="Answer"
                multiline
                rows={3}
                fullWidth
                className={styles.field}
            />
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button>Add card</Button>
            </div>
        </BasicModal>
    )
};