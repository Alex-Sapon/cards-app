import {BasicModal, ModalPropsType} from '../BasicModal';
import Button from '../../../common/button/Button';
import TextField from '@mui/material/TextField';
import styles from './CustomModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {ChangeEvent, useState} from 'react';
import {addCardTC} from '../../../features/packName/reducer/packCardReducer';

export const AddCardModal = ({isOpen, onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const packId = useAppSelector(state => state.cardPack.cardsPack_id);

    const handleOnChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value);
    }

    const handleOnChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value);
    }

    const handleAddCard = () => {
        if (question.trim() && answer.trim()) {
            dispatch(addCardTC(packId, question, answer));
            setAnswer('');
            setQuestion('');
            onClose();
        }
    };

    return (
        <BasicModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.header}>
                <h3>Add new card</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}></div>
            <TextField
                value={question}
                variant="standard"
                label="Question"
                fullWidth
                className={styles.field}
                onChange={handleOnChangeQuestion}
            />
            <TextField
                value={answer}
                variant="outlined"
                label="Answer"
                multiline
                rows={3}
                fullWidth
                className={styles.field}
                onChange={handleOnChangeAnswer}
            />
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddCard}>Add card</Button>
            </div>
        </BasicModal>
    )
};