import React, {useEffect, useState} from 'react';
import {PaginationGroup} from '../paginationGroup';
import {TableRowPack} from '../tableRowPack/TableRowPack';
import {StyledTableCell} from '../tableRowPack/styledTablePack';
import {Button} from '../../../common/button';
import styles from './TablePacks.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import {TableCell, TextField} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {setCardsPageCount, setPage, setSearchPackName, setSortPackName} from './tablePacksReducer';
import {AddPackModal, ModalType} from '../../../components/modals';
import {useAppDispatch, useAppSelector, useDebounce, useInputChange} from '../../../assets/utils/hooks';
import {selectAppStatus} from '../../../app';
import {selectCardPacks, selectCardPacksTotalCount, selectPage, selectPageCount} from './selectors';

export const TablePacks = () => {
    const dispatch = useAppDispatch();

    const {value, onInputChange} = useInputChange();

    const [isOpen, setIsOpen] = useState<ModalType>('close');

    const [name, setName] = useState<'0name' | '1name'>('0name');
    const [cardsCount, setCardsCount] = useState<'0cardsCount' | '1cardsCount'>('0cardsCount');
    const [updated, setUpdated] = useState<'0updated' | '1updated'>('0updated');
    const [userName, setUserName] = useState<'0user_name' | '1user_name'>('0user_name');

    const debouncedValue = useDebounce<string>(value, 500);

    const cardPacks = useAppSelector(selectCardPacks);
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount);
    const pageCount = useAppSelector(selectPageCount);
    const page = useAppSelector(selectPage);
    const status = useAppSelector(selectAppStatus);

    useEffect(() => {
        dispatch(setSearchPackName(debouncedValue));
        dispatch(setPage(1));
    }, [debouncedValue, dispatch])

    const handleAddNewPack = () => setIsOpen('add');

    const handleChangePage = (page: number) => {
        dispatch(setPage(page));
    }

    const handleChangeValueSelect = (value: number) => {
        dispatch(setCardsPageCount(value));
    }

    const handleNameSort = () => {
        setName(name === '0name' ? '1name' : '0name');
        dispatch(setSortPackName(name));
    }

    const handleCardsCount = () => {
        setCardsCount(cardsCount === '0cardsCount' ? '1cardsCount' : '0cardsCount');
        dispatch(setSortPackName(cardsCount));
    }

    const handleSortUpdated = () => {
        setUpdated(updated === '0updated' ? '1updated' : '0updated');
        dispatch(setSortPackName(updated));
    }

    const handleSortUserName = () => {
        setUserName(userName === '0user_name' ? '1user_name' : '0user_name');
        dispatch(setSortPackName(userName));
    }

    return (
        <div className={styles.table_wrapper}>
            <h3 className={styles.table_title}>Packs list</h3>
            <div className={styles.text_field_group}>
                <TextField
                    fullWidth
                    sx={{backgroundColor: '#ECECF9', mr: '2rem'}}
                    size="small"
                    placeholder="Search"
                    disabled={status === 'loading'}
                    value={value}
                    onChange={onInputChange}
                    InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
                />
                {status === 'loading'
                    ? <LoadingButton sx={{padding: '19px 61px', borderRadius: '30px'}} variant="outlined" loading/>
                    : <Button onClick={handleAddNewPack}>Add new pack</Button>}
            </div>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableHead>
                        <TableRow sx={{display: 'grid', gridTemplateColumns: '25% 13% 17% 17% 28%'}}>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={name === '1name' ? 'asc' : 'desc'}
                                    onClick={handleNameSort}
                                >
                                </TableSortLabel>
                                <b>Name</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={cardsCount === '1cardsCount' ? 'asc' : 'desc'}
                                    onClick={handleCardsCount}
                                >
                                </TableSortLabel>
                                <b>Cards</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={updated === '1updated' ? 'asc' : 'desc'}
                                    onClick={handleSortUpdated}
                                >
                                </TableSortLabel>
                                <b>Updated</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={userName === '1user_name' ? 'asc' : 'desc'}
                                    onClick={handleSortUserName}
                                >
                                </TableSortLabel>
                                <b>Created by</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Actions</b>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.length ? cardPacks.map(({_id, name, cardsCount, updated, user_name, user_id, deckCover}) =>
                            <TableRowPack
                                key={_id}
                                id={_id}
                                name={name}
                                cover={deckCover}
                                cardsCount={cardsCount}
                                updated={updated}
                                user_name={user_name}
                                user_id={user_id}
                                status={status}/>
                        ) : (
                            <TableRow>
                                <TableCell className={styles.now_packs}>{'Now packs...'}</TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationGroup
                cardsTotalCount={cardPacksTotalCount}
                pageCount={pageCount}
                page={page}
                title="Cards per Page"
                disable={status === 'loading'}
                onPageChange={handleChangePage}
                onValueChange={handleChangeValueSelect}
            />
            {isOpen === 'add' && <AddPackModal onClose={() => setIsOpen('close')}/>}
        </div>
    )
};