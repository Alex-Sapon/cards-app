import {ChangeEvent, useState} from 'react';
import {useAppDispatch} from '../../app/store';
import {addCardTC} from '../../features/packName/reducer/packCardReducer';

type AddEditProps = [
    error: string,
    changeQuestion: (e: ChangeEvent<HTMLInputElement>) => void,
    changeAnswer: (e: ChangeEvent<HTMLInputElement>) => void,
    addItem: () => void,
    question: string,
    answer: string,
    setQuestion: (value: string) => void,
    setError: (value: string) => void,
]

export const useAddEditItem = (id: string, onClose: () => void): AddEditProps => {
    const dispatch = useAppDispatch();

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const changeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setQuestion(e.currentTarget.value);
    }

    const changeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setAnswer(e.currentTarget.value);
    }

    const addItem = () => {
        if (question.trim() && answer.trim()) {
            dispatch(addCardTC(id, question, answer));
            onClose();
        }

        if (question.trim() && !answer.trim()) setError('Please, enter answer.');

        if (!question.trim() && answer.trim()) setError('Please, enter question.');

        if (!question.trim() && !answer.trim()) setError('Please, enter question and question.');
    };

    return [error, changeQuestion, changeAnswer, addItem, question, answer, setQuestion, setAnswer];
}