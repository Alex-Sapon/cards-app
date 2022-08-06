import React, {ChangeEvent, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Avatar} from '@mui/material';
import TextField from '@mui/material/TextField';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '../../common/button/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import userPhoto from '../../assets/images/avatar.jpg';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {useStyles} from './styles';
import {PATH} from '../../enums/path';
import Badge from '@mui/material/Badge';
import {logoutTC, updateUserDataTC} from '../login/reducer/loginReducer';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import {convertFileToBase64} from '../../assets/utils/convertFileToBase64';

export const Profile = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();

    const avatar = useAppSelector(state => state.login.avatar);
    const name = useAppSelector(state => state.login.name);
    const email = useAppSelector(state => state.login.email);
    const publicCardPacksCount = useAppSelector(state => state.login.publicCardPacksCount);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const status = useAppSelector(state => state.app.status);

    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(name);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(title);
    }

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            convertFileToBase64(file, (file64: string) => {
                dispatch(updateUserDataTC(title, file64));
            })
        }
    }

    const activateViewMode = () => setEditMode(false);

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 30) return;
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            activateViewMode();
        }
    }

    const updateName = () => {
        dispatch(updateUserDataTC(title, avatar));
        setEditMode(false);
    }

    const logoutHandler = () => dispatch(logoutTC());

    useEffect(() => {
        dispatch(updateUserDataTC(title, avatar || userPhoto));
    }, [])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>;

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileLogOutButton}>
                <Tooltip title="Logout">
                    <IconButton disabled={status === 'loading'} onClick={logoutHandler}><LogoutIcon/></IconButton>
                </Tooltip>
            </div>
            <div className={styles.profileWrapper}>
                <div className={styles.title}><AccountBoxIcon sx={{mr: '1rem'}}/>Personal Information</div>
                <label>
                    <input type="file" accept="image/*" style={{display: 'none'}} onChange={upload}/>
                    <Badge
                        overlap="circular"
                        sx={{mb: '2rem'}}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        badgeContent={
                            <IconButton
                                disabled={status === 'loading'}
                                component="span"
                            ><AddAPhotoIcon/></IconButton>}>
                        <Avatar alt="Avatar" src={avatar || userPhoto} sx={{width: 120, height: 120}}/>
                    </Badge>
                </label>
                <div className={styles.information}>
                    <div className={styles.nickName}><b>Nickname: </b>
                        {isEditMode
                            ? <><TextField
                                size="small"
                                fullWidth
                                onKeyPress={onKeyPressHandler}
                                onChange={changeTitle}
                                value={title}
                                variant="standard"
                                autoFocus
                                onBlur={activateViewMode}
                            />
                                <IconButton><ClearIcon fontSize="small"/></IconButton></>
                            : <><span className={styles.name}>{title}</span>
                                <IconButton
                                    disabled={status === 'loading'}
                                    onClick={activateEditMode}
                                ><ModeEditIcon fontSize="small"/></IconButton>
                            </>}
                    </div>
                    <div className={styles.email}><b>Contact email:</b> {email}</div>
                    <div><b>Number of decks created:</b> {publicCardPacksCount}</div>
                </div>
                {status === 'loading'
                    ? <LoadingButton sx={{padding: '17px 61px', borderRadius: '30px'}} variant="outlined" loading/>
                    : <Button className={styles.button} onClick={updateName}>Save</Button>
                }
            </div>
        </div>
    )
};