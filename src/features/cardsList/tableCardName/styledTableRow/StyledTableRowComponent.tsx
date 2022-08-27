import React, {useState} from 'react';
import {StyledTableCell, StyledTableRow} from '../styledTableCard/styledTableCard';
import {shortWord} from '../../../../assets/utils/shortWord';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Grade';
import FavoriteBorderIcon from '@mui/icons-material/Grade';
import styles from '../../CardsList.module.css';
import {Button} from '../../../../common/button';
import {DeleteCardModal, EditCardModal, ModalType} from '../../../../components/modals';
import {setCardId} from '../../reducer/cardsListReducer';
import Avatar from '@mui/material/Avatar';
import DefaultCover from '../../../../assets/images/cover.jpg';
import {useAppDispatch} from '../../../../assets/utils/hooks';

type StyledTableRowProps = {
    cardId: string
    userId: string
    userPackId: string
    question: string
    answer: string
    updated: string
    grade: number
    status: string
    questionImg: string
    answerImg: string
}

export const StyledTableRowComponent = (props: StyledTableRowProps) => {
    const {cardId, userId, userPackId, question, answer, updated, grade, status, questionImg, answerImg} = props;

    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<ModalType>('close');

    const handleDeleteCard = () => {
        dispatch(setCardId(cardId));
        setIsOpen('delete');
    }

    const handleEditCard = () => {
        dispatch(setCardId(cardId));
        setIsOpen('edit');
    }

    const questionSrc = questionImg ? questionImg : DefaultCover;
    const answerSrc = answerImg ? answerImg : DefaultCover;

    return (
        <>
            <StyledTableRow sx={{display: 'grid', gridTemplateColumns: '30% 30% 10% 14% 16%'}}>
                <StyledTableCell component="th" sx={{display: 'flex', alignItems: 'center'}}>
                    {questionImg ? <Avatar
                        sx={{mr: '.5rem', display: 'inline-block'}}
                        variant="rounded" src={questionSrc}/>
                        : <span style={{display: 'inline-block'}}>{shortWord(question, 35)}</span>}
                </StyledTableCell >
                <StyledTableCell component="th" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {answerImg ? <Avatar
                        sx={{mr: '.5rem', display: 'inline-block'}}
                        variant="rounded" src={answerSrc}/>
                        : <span style={{display: 'inline-block'}}>{shortWord(answer, 32)}</span>}
                </StyledTableCell>
                <StyledTableCell sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {new Date(updated).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                <StyledTableCell className={styles.table_button_group}>
                    {userId === userPackId
                        && <>
                            <Button id="btn_delete" disabled={status === 'loading'} onClick={handleDeleteCard}>
                                Delete
                            </Button>
                            <Button disabled={status === 'loading'} onClick={handleEditCard}>
                                Edit
                            </Button>
                        </>}
                </StyledTableCell>
            </StyledTableRow>
            {isOpen === 'delete' && <DeleteCardModal onClose={() => setIsOpen('close')}/>}
            {isOpen === 'edit' && <EditCardModal onClose={() => setIsOpen('close')}/>}
        </>
    )
}