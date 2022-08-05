import React, {useEffect} from 'react';
import {BasicModal, ModalPropsType} from '../BasicModal';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {TextField} from '@mui/material';
import Button from '../../../common/button/Button';
import {useAppSelector} from '../../../app/store';
import {useAddEditItem} from '../../../assets/utils/useAddEditItem';

export const EditCardModal = ({onClose}: ModalPropsType) => {
    const cardId = useAppSelector(state => state.cardPack.cardId);
    const card = useAppSelector(state => state.cardPack.cards.find(card => card._id === cardId));

    const [error, changeQuestion, changeAnswer, addItem, question, answer, setQuestion, setAnswer] = useAddEditItem(cardId, onClose);

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
                <Button onClick={addItem}>Edit pack</Button>
            </div>
            {error && <div className={styles.error}>{error}</div>}
        </BasicModal>
    )
};