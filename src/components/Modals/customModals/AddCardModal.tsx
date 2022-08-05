import {BasicModal, ModalPropsType} from '../BasicModal';
import Button from '../../../common/button/Button';
import TextField from '@mui/material/TextField';
import styles from './CustomModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import {useAppSelector} from '../../../app/store';
import {useAddEditItem} from '../../../assets/utils/useAddEditItem';
import {addCardTC} from '../../../features/packName/reducer/packCardReducer';

export const AddCardModal = ({onClose}: ModalPropsType) => {
    const packId = useAppSelector(state => state.cardPack.cardsPack_id);

    const [error, changeQuestion, changeAnswer, addItem, question, answer] = useAddEditItem(packId, addCardTC, onClose);

    return (
        <BasicModal onClose={onClose}>
            <div className={styles.header}>
                <h3>Add new card</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}/>
            <TextField
                value={question}
                variant="standard"
                label="Question"
                fullWidth
                className={styles.field}
                onChange={changeQuestion}
            />
            <TextField
                value={answer}
                variant="outlined"
                label="Answer"
                multiline
                rows={3}
                fullWidth
                className={styles.field}
                onChange={changeAnswer}
            />
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={addItem}>Add card</Button>
            </div>
            {error && <div className={styles.error}>{error}</div>}
        </BasicModal>
    )
};