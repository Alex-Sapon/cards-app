import styles from './LearnPack.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '../../../common/button';
import {useNavigate, useParams} from 'react-router-dom';
import {PATH} from '../../../enums/path';
import {ChangeEvent, useEffect, useState} from 'react';
import {getCardsPack, setCardPack, updateGradePack} from './learnPackReducer';
import {getCard} from '../../../assets/utils/smartRandom';
import {useAppDispatch, useAppSelector} from '../../../assets/utils/hooks';

const grades = [
    {value: 1, label: 'Did not know'},
    {value: 2, label: 'Forgot'},
    {value: 3, label: 'A lot of thought'},
    {value: 4, label: 'Сonfused'},
    {value: 5, label: 'Knew the answer'},
];

export const LearnPack = () => {
    const dispatch = useAppDispatch();

    const [showAnswer, setShowAnswer] = useState(false);
    const [grade, setGrade] = useState(1);

    const {id} = useParams<'id'>();

    const status = useAppSelector(state => state.app.status);
    const cards = useAppSelector(state => state.learnPack.cards);
    const card = useAppSelector(state => state.learnPack.card);

    const navigate = useNavigate();

    const handleToggleShowAnswer = () => {
        setShowAnswer(true);
    }

    const handleCancel = () => {
        navigate(PATH.PACKS + '/' + PATH.PACKS_LIST);
    }

    const handleNext = () => {
        dispatch(updateGradePack({grade: grade, card_id: card._id}));
        setShowAnswer(false);
    }

    const handleChangeGrade = (e: ChangeEvent<HTMLInputElement>) => {
        const gradeNumbers = [1, 2, 3, 4, 5];
        const value = Number(e.currentTarget.value);

        if (gradeNumbers.includes(value)) {
            setGrade(value);
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(getCardsPack(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (cards.length > 0) {
            dispatch(setCardPack(getCard(cards)));
        }
    }, [cards, dispatch]);

    return (
        <div className={styles.wrapper}>
            {status === 'loading'
                ? <Box sx={{display: 'flex', mt: '25%', justifyContent: 'center'}}><CircularProgress/></Box>
                : <><h3 className={styles.title}>{`Learn “${card.question}”`}</h3>
                    <p className={styles.text}><b>Question: </b>{`“${card.question}”`}</p>
                    {showAnswer
                        ? <><p className={styles.text}><b>Answer: </b>{`“${card.answer}”`}</p>
                            <div className={styles.rate}>
                                <div className={styles.label}>Rate yourself:</div>
                                <FormControl>
                                    <RadioGroup defaultValue={1}>
                                        {grades.map(({value, label}, i) => (
                                            <FormControlLabel
                                                key={value + i}
                                                value={value}
                                                control={<Radio size="small" value={value}
                                                                onChange={handleChangeGrade}/>}
                                                label={label}
                                            />))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={styles.buttons_answer}>
                                <Button onClick={handleCancel}>Cancel</Button>
                                <Button onClick={handleNext}>Next</Button>
                            </div>
                        </>
                        : <div className={styles.buttons_question}>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleToggleShowAnswer}>Show answer</Button>
                        </div>}
                </>}
        </div>
    )
};