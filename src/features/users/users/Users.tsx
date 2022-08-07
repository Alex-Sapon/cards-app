import React, {ChangeEvent} from 'react';
import {NavLink} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Box, TextField} from '@mui/material';
import styles from './Users.module.css';
import {PaginationGroup} from '../../packsList/paginationGroup/PaginationGroup';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setPageCountUsers, setPageUsers} from '../usersReducer';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export const Users = () => {
    const dispatch = useAppDispatch();

    const users = useAppSelector(state => state.usersPage.users);
    const page = useAppSelector(state => state.usersPage.usersParams.page);
    const pageCount = useAppSelector(state => state.usersPage.usersParams.pageCount);
    const usersTotalCount = useAppSelector(state => state.usersPage.usersTotalCount);
    const status = useAppSelector(state => state.app.status);

    const changePageHandler = (page: number) => dispatch(setPageUsers(page));

    const changePageCountHandler = (value: number) => dispatch(setPageCountUsers(value));

    return (
        <Box sx={{mt: '20px', borderRadius: '5px', bgcolor: '#fff'}}>
            <h2 className={styles.title}>Users of Cards App</h2>
            <div className={styles.search}>
                <TextField
                    sx={{backgroundColor: '#f3f0ff', width: '700px'}}
                    size="small"
                    placeholder="Search"
                    disabled={status === 'loading'}
                    // value={value}
                    // onChange={handleChangeValue}
                    InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
                />
            </div>
            <div className={styles.pagination}>
                <PaginationGroup
                    onChangePage={changePageHandler}
                    onChangeValue={changePageCountHandler}
                    page={page}
                    pageCount={pageCount}
                    cardsTotalCount={usersTotalCount}
                    disable={status === 'loading'}
                />
            </div>
            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                {users.map(({_id, name, avatar, email, publicCardPacksCount, isAdmin}) =>
                    <ListItem alignItems="center" key={_id}>
                        <ListItemAvatar>
                            <NavLink to={``}><Avatar alt={name} src={avatar}/></NavLink>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{borderBottom: '1px solid', borderBottomColor: 'rgba(0, 0, 0, 0.12)', pb: '10px'}}
                            primary={name}
                            secondary={
                                <>
                                    <Typography
                                        sx={{display: 'block'}}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >{`Card packs count - ${publicCardPacksCount}`}</Typography>
                                    <Typography
                                        sx={{display: 'inline'}}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >{`Email - ${email}`}</Typography>
                                </>
                            }
                        />
                    </ListItem>
                )}
            </List>
        </Box>
    )
}