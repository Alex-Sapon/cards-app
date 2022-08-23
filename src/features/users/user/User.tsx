import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getUser} from '../usersReducer';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DefaultAvatar from '../../../assets/images/avatar.png';
import Tooltip from '@mui/material/Tooltip';
import {PATH} from '../../../enums/path';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useAppDispatch, useAppSelector} from '../../../assets/utils/hooks';

export const UserProfile = () => {
    const dispatch = useAppDispatch();

    const {id} = useParams<{ id: string }>();

    const navigate = useNavigate();

    const {
        email,
        avatar,
        isAdmin,
        name,
        publicCardPacksCount,
        created,
        updated
    } = useAppSelector(state => state.usersPage.user);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const status = useAppSelector(state => state.app.status);

    useEffect(() => {
        if (id) dispatch(getUser(id));
    }, [id])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return (
        <Card sx={{maxWidth: 445, m: '0 auto', mt: '20px', minHeight: '568px'}}>
            {status === 'loading'
                ? <Box sx={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                    <CircularProgress sx={{mt: '55%'}}/>
                </Box>
                : <>
                    <CardMedia component="img" height="300" image={avatar ? avatar : DefaultAvatar} alt="Avatar"/>
                    <CardContent>
                        <Typography mb={2} gutterBottom variant="h5" component="div">{name}</Typography>
                        <Typography mb={1} variant="body2" component="div" color="text.secondary">
                            <b>Created profile</b> - {new Date(created).toLocaleDateString()}
                        </Typography>
                        <Typography mb={1} variant="body2" component="div" color="text.secondary">
                            <b>Last updated profile</b> - {new Date(updated).toLocaleDateString()}
                        </Typography>
                        <Typography mb={1} variant="body2" color="text.secondary"><b>Email</b> - {email}</Typography>
                        <Typography mb={1} variant="body2" color="text.secondary">
                            <b>Admin</b> - {isAdmin ? 'yes' : 'now'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>Public card packs count</b> - {publicCardPacksCount}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Tooltip title="Back to users list">
                            <span><IconButton onClick={() => navigate(-1)}><ArrowBackIcon/></IconButton></span>
                        </Tooltip>
                    </CardActions>
                </>
            }
        </Card>
    )
}