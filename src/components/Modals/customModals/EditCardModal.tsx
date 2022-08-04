import React, {ChangeEvent, useEffect, useState} from 'react';
import {BasicModal, ModalPropsType} from '../BasicModal';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {TextField} from '@mui/material';
import Button from '../../../common/button/Button';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {updateCardTC} from '../../../features/packName/reducer/packCardReducer';

export const EditCardModal = ({onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const cardId = useAppSelector(state => state.cardPack.cardId);
    const card = useAppSelector(state => state.cardPack.cards.find(card => card._id === cardId));

    const handleOnChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value);

    const handleOnChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value);

    const handleEditCard = () => {
        if (question.trim() && answer.trim()) {
            dispatch(updateCardTC(cardId, question, answer));
            onClose();
        }
    };

    useEffect(() => {
        if (card?.question && card?.answer) {
            setQuestion(card.question);
            setAnswer(card.answer);
        }
    }, [])

    return (
        <BasicModal onClose={onClose}>
            <div className={styles.header}>
                <h3>Edit card</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}/>
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
                <Button onClick={handleEditCard}>Edit pack</Button>
            </div>
        </BasicModal>
    )
};