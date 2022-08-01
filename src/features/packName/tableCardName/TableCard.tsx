import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import styles from './tableCardName.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from '@mui/material';
import {PaginationGroup} from '../../packsList/paginationGroup/PaginationGroup';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import IconButton from '@mui/material/IconButton';

import Button from '../../../common/button/Button';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {
    setCardAnswer,
    setCardId,
    setCardQuestion,
    setCardsPage,
    setCardsPageCount,
    setSearchQuestion
} from '../reducer/packCardReducer';
import {useNavigate} from 'react-router-dom';
import useDebounce from '../../packsList/tablePacks/utils/useDebounce';
import {StyledTableCell, StyledTableRow} from './styledTableCard/styledTableCard';
import {AddCardModal} from '../../../components/Modals/cardModals/AddCardModal';
import {handleOpenModal} from '../../../components/Modals/utilsModal';
import {DeleteCardModal} from '../../../components/Modals/cardModals/DeleteCardModal';
import {EditCardModal} from '../../../components/Modals/cardModals/EditCardModal';
import {TableContainerCards} from './tableContainerCards/TableContainerCards';
import {shortWord} from "../../packsList/tablePacks/utils/shortWord";

export const TableCard = () => {
	const [value, setValue] = useState('')

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const debouncedValue = useDebounce<string>(value, 500)

    const page = useAppSelector(state => state.cardPack.page)
    const cardsTotalCount = useAppSelector(state => state.cardPack.cardsTotalCount)
    const pageCount = useAppSelector(state => state.cardPack.pageCount)
    const packName = useAppSelector(state => state.cardPack.name)
    const userId = useAppSelector(state => state.login._id)
    const user_id = useAppSelector(state => state.cardPack.packUserId)
    const status = useAppSelector(state => state.app.status)


    useEffect(() => {
        dispatch(setSearchQuestion(debouncedValue))
        dispatch(setCardsPage(1))
    }, [debouncedValue,])

    const addNewCard = () => {
        handleOpenModal(dispatch, 'addCard');
    };
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	const onChangePageHandler = (page: number) => {
		dispatch(setCardsPage(page))
	}

	const onChangePageCountHandler = (value: number) => {
		dispatch(setCardsPageCount(value))
		dispatch(setCardsPage(1))
	}

	const onChangeNavigateHandler = () => {
		if (status === 'idle') {
			navigate(-1)
		}
	}

	return (
		<div>
            <AddCardModal/>
            <DeleteCardModal/>
            <EditCardModal/>
			<div className={styles.arrowBackSharpIcon}>
						<span onClick={onChangeNavigateHandler}>
							<IconButton  disabled={status === 'loading'} aria-label="delete">
        <ArrowCircleLeftIcon fontSize={"large"} sx={{color: "#21268F"}}/>
							</IconButton>
						</span>
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
					? <div>
						<Button className={styles.button} disabled={status === 'loading'} onClick={addNewCard}>
							ADD NEW CARD</Button>
					</div> : null}
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
		</div>
	)
};