import React, {useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './Users.module.css';
import {PaginationGroup} from '../../packsList/paginationGroup';
import {setPageCountUsers, setPageUsers, setSearchName} from '../usersReducer';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Tooltip from '@mui/material/Tooltip';
import {useAppDispatch, useAppSelector, useDebounce, useInputChange} from '../../../assets/utils/hooks';

export const Users = () => {
    const dispatch = useAppDispatch();

    const {value, onInputChange} = useInputChange();

    const navigate = useNavigate();

    const users = useAppSelector(state => state.usersPage.users);
    const page = useAppSelector(state => state.usersPage.usersParams.page);
    const pageCount = useAppSelector(state => state.usersPage.usersParams.pageCount);
    const usersTotalCount = useAppSelector(state => state.usersPage.usersTotalCount);
    const status = useAppSelector(state => state.app.status);

    const debouncedValue = useDebounce<string>(value, 500);

    const handleSetPage = (page: number) => dispatch(setPageUsers(page));

    const handleSetPageCount = (value: number) => dispatch(setPageCountUsers(value));

    useEffect(() => {
        dispatch(setSearchName(debouncedValue));
    }, [debouncedValue, dispatch])

    return (
        <Box className={styles.wrapper}>
            <h2 className={styles.title}>Users of Cards Pack</h2>
            <div className={styles.search}>
                <TextField
                    sx={{backgroundColor: '#f3f0ff', width: '50%'}}
                    size="small"
                    placeholder="Search"
                    disabled={status === 'loading'}
                    value={value}
                    onChange={onInputChange}
                    InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
                />
            </div>
            <div className={styles.pagination}>
                <PaginationGroup
                    onPageChange={handleSetPage}
                    onValueChange={handleSetPageCount}
                    page={page}
                    pageCount={pageCount}
                    cardsTotalCount={usersTotalCount}
                    disable={status === 'loading'}
                />
            </div>
            {status === 'loading'
                ? <Box sx={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                    <CircularProgress sx={{mt: '18%'}}/>
                </Box>
                : <List className={styles.list}>
                    {users.map(({_id, name, avatar, publicCardPacksCount}) =>
                        <ListItem alignItems="center" key={_id}>
                            <ListItemAvatar sx={{mr: '1.5rem'}}>
                                <Avatar variant="rounded" sx={{width: '60px', height: '60px'}} alt={name} src={avatar}/>
                            </ListItemAvatar>
                            <ListItemText className={styles.item} primary={name} secondary={
                                <Typography
                                    sx={{display: 'block', m: '0.5rem 0rem 0.5rem'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >{`Public card packs count - ${publicCardPacksCount}`}</Typography>
                            }
                            />
                            <Tooltip title="Go to user profile">
                                <span><IconButton onClick={() => navigate(`/user/${_id}`)}>
                                    <ContactPageIcon/>
                                </IconButton></span>
                            </Tooltip>
                        </ListItem>
                    )}
                </List>
            }
        </Box>
    )
}