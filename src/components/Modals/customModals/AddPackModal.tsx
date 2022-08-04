import {BasicModal, ModalPropsType} from '../BasicModal';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {TextField} from '@mui/material';
import Button from '../../../common/button/Button';
import {useAppDispatch} from '../../../app/store';
import React, {ChangeEvent, useState} from 'react';
import {createNewCardsPack} from '../../../features/packsList/tablePacks/tablePacksReducer';

export const AddPackModal = ({onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleAddNewPack = () => {
        const sendName = name.trim();

        if (sendName) {
            dispatch(createNewCardsPack(sendName, isPrivate));
            setIsPrivate(false);
            onClose();
        }
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);

    const handleOnChecked = () => setIsPrivate(!isPrivate);

    return (
        <BasicModal onClose={onClose}>
            <div className={styles.header}>
                <h3>Add new pack</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}></div>
            <TextField
                onChange={handleOnChange}
                variant="standard"
                label="Name pack"
                fullWidth
                className={styles.field}
            />
            <FormControlLabel
                label="Private"
                className={styles.checkbox}
                control={<Checkbox size="small" onChange={handleOnChecked} checked={isPrivate}/>}
            />
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddNewPack}>Add pack</Button>
            </div>
        </BasicModal>
    )
}