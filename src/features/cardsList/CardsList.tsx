import React, {useEffect, useState} from 'react';
import styles from './CardsList.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from '@mui/material';
import {PaginationGroup} from '../../components/paginationGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {Button} from '../../common/button';
import {setCardsPage, setCardsPageCount, setSearchQuestion} from './reducer/cardsListReducer';
import {useNavigate} from 'react-router-dom';
import {AddCardModal, ModalType} from '../../components/modals';
import {TableContainerCards} from './tableCardName/tableContainerCards/TableContainerCards';
import {shortWord} from '../../assets/utils';
import {useAppDispatch, useAppSelector, useDebounce, useInputChange} from '../../assets/utils/hooks';

export const CardsList = () => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<ModalType>('close');

    const navigate = useNavigate();

    const {value, onInputChange} = useInputChange();

    const debouncedValue = useDebounce<string>(value, 500);

    const page = useAppSelector(state => state.cardList.page);
    const cardsTotalCount = useAppSelector(state => state.cardList.cardsTotalCount);
    const pageCount = useAppSelector(state => state.cardList.pageCount);
    const packName = useAppSelector(state => state.cardList.packName);
    const userId = useAppSelector(state => state.login._id);
    const user_id = useAppSelector(state => state.cardList.packUserId);
    const status = useAppSelector(state => state.app.status);

    useEffect(() => {
        dispatch(setSearchQuestion(debouncedValue));
        dispatch(setCardsPage(1));
    }, [debouncedValue, dispatch])

    const handleSetPage = (page: number) => dispatch(setCardsPage(page));

    const handleSetPageCount = (value: number) => {
        dispatch(setCardsPageCount(value));
        dispatch(setCardsPage(1));
    }

    return (
        <>
            <div className={styles.arrow_back}>
                <IconButton disabled={status === 'loading'} onClick={() => navigate(-1)}>
                    <ArrowBackIcon/>
                </IconButton>
                <h2 className={styles.table_title}>{shortWord(packName, 55)}</h2>
            </div>
            <div className={styles.inputContainer}>
                <TextField
                    onChange={onInputChange}
                    fullWidth
                    sx={{backgroundColor: '#ECECF9'}}
                    size="small"
                    placeholder="Search..."
                    disabled={status === 'loading'}
                    InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
                />
                {userId === user_id &&
                    <Button className={styles.button} disabled={status === 'loading'} onClick={() => setIsOpen('add')}>
                        Add new card
                    </Button>}
            </div>
            <TableContainerCards/>
            <div className={styles.paginationContainer}>
                <PaginationGroup
                    page={page}
                    pageCount={pageCount}
                    cardsTotalCount={cardsTotalCount}
                    onPageChange={handleSetPage}
                    onValueChange={handleSetPageCount}
                    disable={status === 'loading'}
                    title="Cards per Page"
                />
            </div>
            {isOpen === 'add' && <AddCardModal onClose={() => setIsOpen('close')}/>}
        </>
    )
};