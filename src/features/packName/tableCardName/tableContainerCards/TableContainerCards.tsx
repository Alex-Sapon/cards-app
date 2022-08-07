import React, {useState} from 'react';
import {StyledTableCell, StyledTableRow} from '../styledTableCard/styledTableCard';
import {setSortCards,} from '../../reducer/packCardReducer';
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import styles from '../tableCardName.module.css';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import {StyledTableRowComponent} from '../styledTableRow/StyledTableRowComponent';

export const TableContainerCards = () => {
    const dispatch = useAppDispatch();

    const [question, setQuestion] = useState<'0question' | '1question'>('0question');
    const [answer, setAnswer] = useState<'0answer' | '1answer'>('0answer');
    const [updated, setUpdated] = useState<'0updated' | '1updated'>('0updated');
    const [grade, setGrade] = useState<'0grade' | '1grade'>('0grade');

    const userId = useAppSelector(state => state.login._id);
    const cards = useAppSelector(state => state.cardPack.cards);
    const status = useAppSelector(state => state.app.status);

    const handleSortQuestion = () => {
        setQuestion(question === '0question' ? '1question' : '0question');
        dispatch(setSortCards(question));
    }

    const handleSortAnswer = () => {
        setAnswer(answer === '0answer' ? '1answer' : '0answer');
        dispatch(setSortCards(answer));
    }

    const handleSortUpdated = () => {
        setUpdated(updated === '0updated' ? '1updated' : '0updated');
        dispatch(setSortCards(updated));
    }

    const handleSortGrade = () => {
        setGrade(grade === '0grade' ? '1grade' : '0grade');
        dispatch(setSortCards(grade));
    }

    return (
        <Paper elevation={3}>
            <TableContainer>
                <Table>
                    <TableHead className={styles.wrapperRowCards}>
                        <TableRow sx={{display: 'grid', gridTemplateColumns: '29% 29% 13% 12% 17%'}}>
                            <StyledTableCell align="justify">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={question === '1question' ? 'asc' : 'desc'}
                                    onClick={handleSortQuestion}>
                                </TableSortLabel>
                                <b>Question</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={answer === '1answer' ? 'asc' : 'desc'}
                                    onClick={handleSortAnswer}>
                                </TableSortLabel>
                                <b>Answer</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={updated === '1updated' ? 'asc' : 'desc'}
                                    onClick={handleSortUpdated}>
                                </TableSortLabel>
                                <b>Updated</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={grade === '1grade' ? 'asc' : 'desc'}
                                    onClick={handleSortGrade}>
                                </TableSortLabel>
                                <b>Grade</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Actions</b>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.length ? cards.map(({answer, question, updated, _id, user_id, grade, questionImg, answerImg}) =>
                            <StyledTableRowComponent
                                key={_id}
                                cardId={_id}
                                answer={answer}
                                question={question}
                                updated={updated}
                                userPackId={user_id}
                                userId={userId}
                                grade={grade}
                                status={status}
                                questionImg={questionImg}
                                answerImg={answerImg}
                            />
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell className={styles.now_cards}>Now cards...</StyledTableCell>
                            </StyledTableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
};

