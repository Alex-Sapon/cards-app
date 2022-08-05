import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './tableCardName.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Box, CircularProgress, TextField} from '@mui/material';
import {PaginationGroup} from '../../packsList/paginationGroup/PaginationGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Button from '../../../common/button/Button';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setCardsPage, setCardsPageCount, setSearchQuestion} from '../reducer/packCardReducer';
import {useNavigate} from 'react-router-dom';
import useDebounce from '../../../assets/utils/useDebounce';
import {AddCardModal} from '../../../components/Modals/customModals/AddCardModal';
import {TableContainerCards} from './tableContainerCards/TableContainerCards';
import {shortWord} from '../../../assets/utils/shortWord';
import {ModalType} from '../../../components/Modals/BasicModal';

export const TableCard = () => {
    const dispatch = useAppDispatch();

    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState<ModalType>('close');

    const navigate = useNavigate();

    const debouncedValue = useDebounce<string>(value, 500);

    const page = useAppSelector(state => state.cardPack.page);
    const cardsTotalCount = useAppSelector(state => state.cardPack.cardsTotalCount);
    const pageCount = useAppSelector(state => state.cardPack.pageCount);
    const packName = useAppSelector(state => state.cardPack.packName);
    const userId = useAppSelector(state => state.login._id);
    const user_id = useAppSelector(state => state.cardPack.packUserId);
    const status = useAppSelector(state => state.app.status);

    useEffect(() => {
        dispatch(setSearchQuestion(debouncedValue));
        dispatch(setCardsPage(1));
    }, [debouncedValue])

    const addNewCard = () => setIsOpen('add');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

    const onChangePageHandler = (page: number) => dispatch(setCardsPage(page));

    const onChangePageCountHandler = (value: number) => {
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
                    onChange={onChangeHandler}
                    fullWidth
                    sx={{backgroundColor: '#ECECF9'}}
                    size="small"
                    placeholder="Search..."
                    disabled={status === 'loading'}
                    InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
                />
                {userId === user_id
                    && <Button className={styles.button} disabled={status === 'loading'} onClick={addNewCard}>
                        Add new card
                    </Button>}
            </div>
            <TableContainerCards/>
            <div className={styles.paginationContainer}>
                <PaginationGroup
                    page={page}
                    pageCount={pageCount}
                    cardsTotalCount={cardsTotalCount}
                    onChangePage={onChangePageHandler}
                    onChangeValue={onChangePageCountHandler}
                    disable={status === 'loading'}
                    title="Cards per Page"
                />
            </div>
            {isOpen === 'add' && <AddCardModal onClose={() => setIsOpen('close')}/>}
        </>
    )
};