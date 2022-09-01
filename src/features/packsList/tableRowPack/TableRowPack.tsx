import React, {memo, useState} from 'react';
import {AppStateType} from '../../../app/store';
import {StyledTableCell, StyledTableRow} from './styledTablePack';
import {shortWord} from '../../../assets/utils';
import {PATH} from '../../../enums/path';
import {useNavigate} from 'react-router-dom';
import {Button} from '../../../common/button';
import {RequestStatusType} from '../../../app';
import styles from './TableRowPack.module.css';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import {setUserCardId, setUserCardName} from '../../cardsList';
import {DeletePackModal, EditPackModal, ModalType} from '../../../components/modals';
import {setPackModalParams} from '../reducer/packsListReducer';
import {useAppDispatch, useAppSelector} from '../../../assets/utils/hooks';

type TableRowPackType = {
    id: string
    name: string
    cardsCount: number
    updated: string
    cover: string
    user_name: string
    user_id: string
    status: RequestStatusType
}

const selectLoginUserId = (state: AppStateType): string => state.login._id

export const TableRowPack = memo((props: TableRowPackType) => {
    const {id, name, cardsCount, updated, user_id, user_name, status, cover} = props;

    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<ModalType>('close');

    const navigate = useNavigate();

    const userId = useAppSelector(selectLoginUserId);

    const handleDeletePack = () => {
        dispatch(setPackModalParams({packId: id, packName: name}));
        setIsOpen('delete');
    }

    const handleEditPack = () => {
        dispatch(setPackModalParams({packId: id, packName: name}));
        setIsOpen('edit');
    }

    const handleLearnPack = () => navigate(`/packs/learn-pack/${id}`);

    const handleSendPackId = () => {
        dispatch(setUserCardId(id));
        dispatch(setUserCardName(name));
        navigate(PATH.PACKS + '/' + PATH.CARDS);
    }

    return (
        <>
            <StyledTableRow sx={{display: 'grid', gridTemplateColumns: '28% 8% 21% 15% 28%'}}>
                <StyledTableCell component="th" scope="row" className={styles.sell}>
                    <Avatar sx={{mr: '.5rem'}} variant="rounded" src={cover}/>
                    <span style={{display: 'inline-block', flex: '1 1 auto'}}>{shortWord(name, 12)}</span>
                    <IconButton
                        disabled={status === 'loading'}
                        aria-label="expand row"
                        size="small"
                        onClick={handleSendPackId}
                    >
                        <DriveFolderUploadIcon/>
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell className={styles.sell}>{cardsCount}</StyledTableCell>
                <StyledTableCell className={styles.sell}>
                    {new Date(updated).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell className={styles.sell}>
                    {shortWord(user_name, 8)}
                </StyledTableCell>
                <StyledTableCell align="center" className={styles.table_button_group}>
                    {userId === user_id
                        && <>
                            <Button id="btn_delete" disabled={status === 'loading'} onClick={handleDeletePack}>
                                Delete
                            </Button>
                            <Button disabled={status === 'loading'} onClick={handleEditPack}>
                                Edit
                            </Button>
                        </>}
                    <Button disabled={!cardsCount || status === 'loading'} onClick={handleLearnPack}>Learn</Button>
                </StyledTableCell>
            </StyledTableRow>
            {isOpen === 'delete' && <DeletePackModal onClose={() => setIsOpen('close')}/>}
            {isOpen === 'edit' && <EditPackModal onClose={() => setIsOpen('close')}/>}
        </>
    )
});