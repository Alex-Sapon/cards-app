import * as React from 'react';
import {memo} from 'react';
import styles from './PaginationGroup.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type PaginationGroupType = {
	cardsTotalCount?: number
	pageCount?: number
	page?: number
	title?: string
	disable?: boolean
	onPageChange: (page: number) => void
	onValueChange: (value: number) => void
}

export const PaginationGroup = memo((props: PaginationGroupType) => {
	const {cardsTotalCount, pageCount, page, title, disable, onValueChange, onPageChange} = props;

	const handleChangePageCount = (e: SelectChangeEvent) => {
		if (pageCount && Number(e.target.value) !== pageCount) {
			onValueChange(Number(e.target.value));
		}
	}

	const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
		onPageChange(value);
	}

	const totalPageCount = cardsTotalCount && pageCount && Math.ceil(cardsTotalCount / pageCount);

	return (
		<div className={styles.pagination_group}>
			<Stack spacing={2} sx={{mr: '2rem'}}>
				<Pagination
					disabled={disable}
					count={totalPageCount}
					page={page}
					shape="rounded"
					onChange={handleChangePage}
				/>
			</Stack>
			<div className={styles.select_wrapper}>
				<span>Show</span>
				<Select
					disabled={disable}
					size="small"
					value={String(pageCount)}
					onChange={handleChangePageCount}
					sx={{minWidth: '65px', m: '0 0.5rem', height: '30px'}}
				>
					<MenuItem value="5">{'5'}</MenuItem>
					<MenuItem value="10">{'10'}</MenuItem>
					<MenuItem value="15">{'15'}</MenuItem>
				</Select>
				<span>{title}</span>
			</div>
		</div>
	)
});