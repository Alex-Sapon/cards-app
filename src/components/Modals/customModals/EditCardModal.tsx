import React, {ChangeEvent, useEffect, useState} from 'react';
import {BasicModal, ModalPropsType} from '../BasicModal';
import styles from './CustomModal.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {TextField} from '@mui/material';
import Button from '../../../common/button/Button';
import {updateCard} from '../../../features/packName/reducer/packCardReducer';
import Cover from '../../../assets/images/cover.jpg';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {setAppError} from '../../../app/reducer/app-reducer';
import {convertFileToBase64} from '../../../assets/utils/convertFileToBase64';
import {useAppDispatch, useAppSelector} from '../../../assets/utils/hooks';

export const EditCardModal = ({onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const cardId = useAppSelector(state => state.cardPack.cardId);
    const card = useAppSelector(state => state.cardPack.cards.find(card => card._id === cardId));
    const error = useAppSelector(state => state.app.error);

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const changeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        error && dispatch(setAppError(null));
        setQuestion(e.currentTarget.value);
    }

    const changeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        error && dispatch(setAppError(null));
        setAnswer(e.currentTarget.value);
    }

    const addItem = () => {
        const sendQuestion = question.trim();
        const sendAnswer = answer.trim();

        if (sendQuestion && sendAnswer) {
            if (sendQuestion.includes('data:image') || sendAnswer.includes('data:image')) {
                dispatch(updateCard({_id: cardId, questionImg: sendQuestion, answerImg: sendAnswer}));
                onClose();
            } else {
                dispatch(updateCard({_id: cardId, question: sendQuestion, answer: sendAnswer}));
                onClose();
            }
        }

        if (sendQuestion && !sendAnswer) dispatch(setAppError('Please, enter answer.'));

        if (!sendQuestion && sendAnswer) dispatch(setAppError('Please, enter question.'));

        if (!sendQuestion && !sendAnswer) dispatch(setAppError('Please, enter question and answer.'));
    };

    const uploadQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            convertFileToBase64(file, (file64: string) => {
                if (file64.includes('data:image')) {
                    setQuestion(file64);
                } else {
                    dispatch(setAppError('Wrong file format from question image.'));
                }
            })
        }
    }

    const uploadAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            convertFileToBase64(file, (file64: string) => {
                if (file64.includes('data:image')) {
                    setAnswer(file64);
                } else {
                    dispatch(setAppError('Wrong file format from answer image.'));
                }
            })
        }
    }

    useEffect(() => {
        if (card?.question && card?.answer) {
            setQuestion(card.question);
            setAnswer(card.answer);
        }

        if (card?.answerImg && card?.questionImg) {
            setQuestion(card.questionImg);
            setAnswer(card.answerImg);
        }

    }, [])

    return (
        <BasicModal onClose={onClose}>
            <div className={styles.header}>
                <h3>Edit card</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}/>
            {card?.answerImg ? <>
                    <div className={styles.label}>
                        <label className={styles.cover}>
                            <input type="file" style={{display: 'none'}} accept="image/*" onChange={uploadQuestion}/>
                            <IconButton component="span"><AddPhotoAlternateIcon/></IconButton>
                            <span>New question</span>
                        </label>
                    </div>
                    <img src={card?.questionImg ? card?.questionImg : Cover} alt="Question" className={styles.image}/>
                    <div className={styles.label}>
                        <label className={styles.cover}>
                            <input type="file" style={{display: 'none'}} accept="image/*" onChange={uploadAnswer}/>
                            <IconButton component="span"><AddPhotoAlternateIcon/></IconButton>
                            <span>New answer</span>
                        </label>
                    </div>
                    <img src={card?.answerImg ? card?.answerImg : Cover} alt="Answer" className={styles.image}/></>
                : <>
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
                    /></>}
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={addItem}>Edit pack</Button>
            </div>
        </BasicModal>
    )
};