import React, {FC, useState} from 'react';
import {StyledTableCell, StyledTableRow} from '../styledTableCard/styledTableCard';
import {shortWord} from '../../../../assets/utils/shortWord';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Grade';
import FavoriteBorderIcon from '@mui/icons-material/Grade';
import styles from '../tableCardName.module.css';
import Button from '../../../../common/button/Button';
import {DeleteCardModal} from '../../../../components/Modals/customModals/DeleteCardModal';
import {EditCardModal} from '../../../../components/Modals/customModals/EditCardModal';
import {ModalType} from '../../../../components/Modals/BasicModal';
import {useAppDispatch} from '../../../../app/store';
import {setCardId} from '../../reducer/packCardReducer';

type StyledTableRowProps = {
    cardId: string
    userId: string
    userPackId: string
    question: string
    answer: string
    updated: string
    grade: number
    status: string
}

export const StyledTableRowComponent = (props: StyledTableRowProps) => {
    const {cardId, userId, userPackId, question, answer, updated, grade, status} = props;

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

    return (
        <>
            <StyledTableRow>
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
                    {userId === userPackId
                        ? <>
                            <Button id="btn_delete" disabled={status === 'loading'} onClick={handleDeleteCard}>
                                Delete
                            </Button>
                            <Button disabled={status === 'loading'} onClick={handleEditCard}>
                                Edit
                            </Button>
                        </>
                        : null}
                </StyledTableCell>
            </StyledTableRow>
            {isOpen === 'delete' && <DeleteCardModal onClose={() => setIsOpen('close')}/>}
            {isOpen === 'edit' && <EditCardModal onClose={() => setIsOpen('close')}/>}
        </>
    )
}