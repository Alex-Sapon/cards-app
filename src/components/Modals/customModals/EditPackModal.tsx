import {BasicModal, ModalPropsType} from '../BasicModal';
import * as React from 'react';
import styles from './CustomModal.module.css';
import {TextField} from '@mui/material';
import Button from '../../../common/button/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {deleteUpdateCardsPack} from '../../../features/packsList/tablePacks/tablePacksReducer';

export const EditPackModal = ({isOpen, onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const {packId, packName} = useAppSelector(state => state.packList);
    const status = useAppSelector(state => state.app.status);

    const [newName, setNewName] = useState('');

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setNewName(e.currentTarget.value);

    const handleEditPack = () => {
        if (newName.trim()) {
            dispatch(deleteUpdateCardsPack(packId, newName));
            onClose();
        }
    };

    const handleOnKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') handleEditPack();
    }

    useEffect(() => {
        setNewName(packName);
    } ,[packName])

    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.header}>
                <h3>Edit pack</h3>
                <IconButton onClick={onClose} disabled={status === 'loading'}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}></div>
            <TextField
                value={newName}
                autoFocus
                variant="standard"
                label="Name pack"
                fullWidth
                disabled={status === 'loading'}
                className={styles.field}
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
            />
            <div className={styles.buttons}>
                <Button onClick={onClose} disabled={status === 'loading'}>Cancel</Button>
                <Button onClick={handleEditPack} disabled={status === 'loading'}>Edit pack</Button>
            </div>
        </BasicModal>
    )
};