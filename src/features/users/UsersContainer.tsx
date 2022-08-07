import React, {useEffect} from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {getUsers} from './usersReducer';
import {PaginationGroup} from '../packsList/paginationGroup/PaginationGroup';
import {Box} from '@mui/material';
import styles from './Users.module.css';
import {PATH} from '../../enums/path';

export const UsersContainer = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const users = useAppSelector(state => state.usersPage.users);
    const page = useAppSelector(state => state.usersPage.usersParams.page);
    const pageCount = useAppSelector(state => state.usersPage.usersParams.pageCount);

    useEffect(() => {
        dispatch(getUsers());
    }, [users, page, pageCount])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return (
        <Box sx={{mt: '20px', borderRadius: '5px'}}>
            <div className={styles.pagination}>
                <PaginationGroup onChangePage={() => {}} onChangeValue={() => {}}/>
            </div>

            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                {users.map(({_id, name, avatar, email, publicCardPacksCount, isAdmin}) =>
                    <>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <NavLink to={``}><Avatar alt={name} src={avatar}/></NavLink>
                            </ListItemAvatar>
                            <ListItemText
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
                        <Divider variant="inset" component="li"/>
                    </>
                )}
            </List>
        </Box>
    )
}