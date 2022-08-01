import React, {useState} from 'react';
import {StyledTableCell, StyledTableRow} from "../styledTableCard/styledTableCard";
import {shortWord} from "../../../packsList/tablePacks/utils/shortWord";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Grade";
import FavoriteBorderIcon from "@mui/icons-material/Grade";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import {
	removeCardTC,
	setCardAnswer,
	setCardId,
	setCardQuestion,
	setSortCards,
	updateCardTC
} from '../../reducer/packCardReducer';
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import styles from '../tableCardName.module.css';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import {TableCell} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {handleOpenModal} from '../../../../components/Modals/utilsModal';

export const TableContainerCards = () => {

	const [question, setQuestion] = useState<'0question' | '1question'>('0question');
	const [answer, setAnswer] = useState<'0answer' | '1answer'>('0answer');
	const [updated, setUpdated] = useState<'0updated' | '1updated'>('0updated');
	const [grade, setGrade] = useState<'0grade' | '1grade'>('0grade');

	const userId = useAppSelector(state => state.login._id)
	const cards = useAppSelector(state => state.cardPack.cards)
	const status = useAppSelector(state => state.app.status)

	const dispatch = useAppDispatch()

	const handleSortQuestion = () => {
		setQuestion(question === '0question' ? '1question' : '0question');
		question && dispatch(setSortCards(question));
	}

	const handleSortAnswer = () => {
		setAnswer(answer === '0answer' ? '1answer' : '0answer');
		answer && dispatch(setSortCards(answer));
	}

	const handleSortUpdated = () => {
		setUpdated(updated === '0updated' ? '1updated' : '0updated');
		updated && dispatch(setSortCards(updated));
	}

	const handleSortGrade = () => {
		setGrade(grade === '0grade' ? '1grade' : '0grade');
		grade && dispatch(setSortCards(grade));
	}

	return (
		<Table>
			<Paper elevation={3}>
				<TableContainer>
					<Table>
						<TableHead className={styles.wrapperRowCards}>
							<TableRow>
								<StyledTableCell align="justify">
									<TableSortLabel
										active={true}
										disabled={status === 'loading'}
										direction={question === '1question' ? 'asc' : 'desc'}
										onClick={handleSortQuestion}>
									</TableSortLabel>
									<b>Question</b>
								</StyledTableCell>
								<StyledTableCell align="justify">
									<TableSortLabel
										active={true}
										disabled={status === 'loading'}
										direction={answer === '1answer' ? 'asc' : 'desc'}
										onClick={handleSortAnswer}>
									</TableSortLabel>
									<b>Answer</b>
								</StyledTableCell>
								<StyledTableCell align="justify">
									<TableSortLabel
										active={true}
										disabled={status === 'loading'}
										direction={updated === '1updated' ? 'asc' : 'desc'}
										onClick={handleSortUpdated}>
									</TableSortLabel>
									<b>Updated</b>
								</StyledTableCell>
								<StyledTableCell align="justify">
									<TableSortLabel
										active={true}
										disabled={status === 'loading'}
										direction={grade === '1grade' ? 'asc' : 'desc'}
										onClick={handleSortGrade}>
									</TableSortLabel>
									<b>Grade</b>
								</StyledTableCell>
								<StyledTableCell align="justify">
									<b>Actions</b>
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{cards.length ? cards.map(({answer, question, updated, _id, user_id, grade}) => {
								const changeCard = () => {
									handleOpenModal(dispatch, 'editCard');
									dispatch(setCardId(_id))
									dispatch(setCardQuestion(question))
									dispatch(setCardAnswer(answer))
								};

								const removeCard = () => {
									handleOpenModal(dispatch, 'deleteCard');
									dispatch(setCardId(_id))
									dispatch(setCardQuestion(question))
								};
								return (
									<StyledTableRow key={_id}>
										<StyledTableCell component="th" scope="row">
											<span style={{display: 'inline-block', flex: '1 1 auto'}}>{shortWord(question, 50)}</span>
										</StyledTableCell>
										<StyledTableCell align="justify">{shortWord(answer, 100)}</StyledTableCell>
										<StyledTableCell align="justify">{new Date(updated).toLocaleDateString()}</StyledTableCell>
										<StyledTableCell align="justify">
											<Rating
												value={Number(grade.toFixed(1))}
												precision={0.1}
												icon={<FavoriteIcon fontSize="inherit" color="error"/>}
												emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
												size="medium"
												disabled={status === 'loading'}
												readOnly
											/>
										</StyledTableCell>
										<StyledTableCell align="center" className={styles.table_button_group}>
											{userId === user_id
												? <TableRow
													className={styles.icon}>
													<IconButton disabled={status === 'loading'} aria-label="delete">
														<DeleteForeverIcon
															onClick={removeCard}/>
													</IconButton> <IconButton disabled={status === 'loading'} aria-label="delete">
													<CreateIcon
														onClick={changeCard}/>
												</IconButton>
												</TableRow> : null}
										</StyledTableCell>
									</StyledTableRow>
								)
							}) : (
								<TableRow>
								<td className={styles.now_cards}>Now pack...</td>
								</TableRow>)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Table>
	);
};

