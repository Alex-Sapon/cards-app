import {BasicModal, ModalPropsType} from '../BasicModal';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {TextField} from '@mui/material';
import {Button} from '../../../common/button';
import React, {ChangeEvent, useState} from 'react';
import {createCardsPack} from '../../../features/packsList/tablePacks/tablePacksReducer';
import {convertFileToBase64} from '../../../assets/utils/convertFileToBase64';
import {setAppError} from '../../../app';
import {useAppDispatch} from '../../../assets/utils/hooks';

export const AddPackModal = ({onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [cover, setCover] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleAddNewPack = () => {
        dispatch(createCardsPack(name.trim(), cover, isPrivate));
        setIsPrivate(false);
        onClose();
    }

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            convertFileToBase64(file, (file64: string) => {
                if (file64.includes('data:image')) {
                    setCover(file64);
                } else {
                    dispatch(setAppError('Wrong file format.'));
                }
            })
        }
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);

    const handleOnChecked = () => setIsPrivate(prev => !prev);

    return (
        <BasicModal onClose={onClose}>
            <div className={styles.header}>
                <h3>Add new pack</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}/>
            <TextField
                onChange={handleOnChange}
                variant="standard"
                label="Name pack"
                fullWidth
                className={styles.field}
            />
            <div className={styles.block}>
                <label className={styles.cover}>
                    <input type="file" style={{display: 'none'}} accept="image/*" onChange={upload}/>
                    <IconButton component="span"><AddPhotoAlternateIcon/></IconButton>
                    <span>Upload cover</span>
                </label>
                <FormControlLabel
                    label="Private"
                    className={styles.checkbox}
                    control={<Checkbox size="small" onChange={handleOnChecked} checked={isPrivate}/>}
                />
            </div>
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddNewPack}>Add pack</Button>
            </div>
        </BasicModal>
    )
}