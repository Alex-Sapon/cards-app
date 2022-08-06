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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {convertFileToBase64} from '../../../assets/utils/convertFileToBase64';
import Cover from '../../../assets/images/cover.jpg';

export const EditPackModal = ({onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const [newName, setNewName] = useState('');

    const {packId, packName} = useAppSelector(state => state.packList);
    const pack = useAppSelector(state => state.packList.cardPacks.find(pack => pack._id === packId));

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setNewName(e.currentTarget.value);

    const name = newName.trim();

    const handleEditPack = () => {
        if (name) {
            dispatch(deleteUpdateCardsPack(packId, newName));
            onClose();
        }
    };

    const handleOnKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') handleEditPack();
    }

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            convertFileToBase64(file, (file64: string) => {
                dispatch(deleteUpdateCardsPack(packId, name, file64));
                onClose();
            })
        }
    }

    useEffect(() => {
        setNewName(packName);
    } ,[packName])

    return (
        <BasicModal onClose={onClose}>
            <div className={styles.header}>
                <h3>Edit pack</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}/>
            <img src={pack?.deckCover ? pack?.deckCover : Cover} alt="" className={styles.image}/>
            <TextField
                value={newName}
                autoFocus
                variant="standard"
                label="Name pack"
                fullWidth
                className={styles.field}
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
            />
            <div className={styles.block}>
                <label className={styles.cover}>
                    <input type="file" style={{display: 'none'}} accept="image/*" onChange={upload}/>
                    <IconButton component="span"><AddPhotoAlternateIcon/></IconButton>
                    <span>Upload new cover</span>
                </label>
            </div>
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleEditPack}>Edit pack</Button>
            </div>
        </BasicModal>
    )
};