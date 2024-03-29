import React, {ChangeEvent, useState} from 'react';
import {createCard} from '../../../features/cardsList/reducer/cardsListReducer';
import {Button} from '../../../common/button';
import {BasicModal, ModalPropsType} from '../BasicModal';
import TextField from '@mui/material/TextField';
import styles from './CustomModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {setAppError} from '../../../app';
import {convertFileToBase64} from '../../../assets/utils/convertFileToBase64';
import {useAppDispatch, useAppSelector} from '../../../assets/utils/hooks';

export const AddCardModal = ({onClose}: ModalPropsType) => {
    const dispatch = useAppDispatch();

    const packId = useAppSelector(state => state.cardList.cardsPack_id);
    const error = useAppSelector(state => state.app.error);

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isChecked, setIsChecked] = useState(true);

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
            if (sendQuestion.includes('data:image') && sendAnswer.includes('data:image')) {
                dispatch(createCard({cardsPack_id: packId, answerImg: sendAnswer, questionImg: sendQuestion}));
                onClose();
            } else {
                dispatch(createCard({cardsPack_id: packId, answer: sendAnswer, question: sendQuestion}));
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

    return (
        <BasicModal onClose={onClose}>
            <div className={styles.header}>
                <h3>Add new card</h3>
                <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={styles.divider}/>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked checked={isChecked}
                    onChange={() => setIsChecked(prev => !prev)}/>} label="Enter text question / answer"/>
                <FormControlLabel control={
                    <Checkbox checked={!isChecked}
                              onChange={() => setIsChecked(prev => !prev)}/>} label="Upload image question / answer"/>
            </FormGroup>
            {isChecked && <><TextField
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
            {!isChecked && <div className={styles.block}>
                <label className={styles.cover}>
                    <input type="file" style={{display: 'none'}} accept="image/*" onChange={uploadQuestion}/>
                    <IconButton component="span"><AddPhotoAlternateIcon/></IconButton>
                    <span>Image question</span>
                </label>
                <label className={styles.cover}>
                    <input type="file" style={{display: 'none'}} accept="image/*" onChange={uploadAnswer}/>
                    <IconButton component="span"><AddPhotoAlternateIcon/></IconButton>
                    <span>Image answer</span>
                </label>
            </div>}
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={addItem}>Add card</Button>
            </div>
        </BasicModal>
    )
};