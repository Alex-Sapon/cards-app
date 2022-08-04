import React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {PaginationGroup} from '../paginationGroup/PaginationGroup';
import {AppStateType, useAppDispatch, useAppSelector} from '../../../app/store';
import useDebounce from '../../../assets/utils/useDebounce';
import {PackType} from '../packsList-api';
import {RequestStatusType} from '../../../app/reducer/app-reducer';
import {TableRowPack} from '../tableRowPack/TableRowPack';
import {StyledTableCell} from '../tableRowPack/styledTablePack';
import Button from '../../../common/button/Button';
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
import {AddPackModal} from '../../../components/Modals/customModals/AddPackModal';
import {ModalType} from '../../../components/Modals/BasicModal';

const selectCardPacks = (state: AppStateType): PackType[] => state.packList.cardPacks;
const selectCardPacksTotalCount = (state: AppStateType): number => state.packList.cardPacksTotalCount;
const selectPageCount = (state: AppStateType): number => state.tablePacks.pageCount;
const selectPage = (state: AppStateType): number => state.tablePacks.page;
const selectStatus = (state: AppStateType): RequestStatusType => state.app.status;


export const TablePacks = () => {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState<ModalType>('close');

    const [name, setName] = useState<'0name' | '1name'>('0name');
    const [cardsCount, setCardsCount] = useState<'0cardsCount' | '1cardsCount'>('0cardsCount');
    const [updated, setUpdated] = useState<'0updated' | '1updated'>('0updated');
    const [userName, setUserName] = useState<'0user_name' | '1user_name'>('0user_name');

    const dispatch = useAppDispatch();

    const debouncedValue = useDebounce<string>(value, 500);

    const cardPacks = useAppSelector(selectCardPacks);
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount);
    const pageCount = useAppSelector(selectPageCount);
    const page = useAppSelector(selectPage);
    const status = useAppSelector(selectStatus);

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    useEffect(() => {
        dispatch(setSearchPackName(debouncedValue));
        dispatch(setPage(1));
    }, [debouncedValue])

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
                    onChange={handleChangeValue}
                    InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
                />
                {status === 'loading'
                    ? <LoadingButton sx={{padding: '19px 61px', borderRadius: '30px'}} variant="outlined" loading/>
                    : <Button onClick={handleAddNewPack}>Add new pack</Button>}
            </div>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableHead>
                        <TableRow sx={{display: 'grid', gridTemplateColumns: '21% 15% 19% 17% 28%'}}>
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
                                <b>Last Updated</b>
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
                        {cardPacks.length ? cardPacks.map(({_id, name, cardsCount, updated, user_name, user_id}) =>
                            <TableRowPack
                                key={_id}
                                _id={_id}
                                name={name}
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
                onChangePage={handleChangePage}
                onChangeValue={handleChangeValueSelect}
            />
            {isOpen === 'add' && <AddPackModal onClose={() => setIsOpen('close')}/>}
        </div>
    )
};