import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Avatar} from '@mui/material';
import TextField from '@mui/material/TextField';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import {AccountCircle} from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Button from '../../common/button/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import userPhoto from '../../assets/images/avatar.jpg';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {useStyles} from './styles';
import {PATH} from '../../enums/path';
import Badge from '@mui/material/Badge';
import {logoutTC, updateUserDataTC} from '../login/reducer/loginReducer';
import IconButton from '@mui/material/IconButton';

export const Profile = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const avatar = useAppSelector(state => state.login.avatar);
    const name = useAppSelector(state => state.login.name);
    const email = useAppSelector(state => state.login.email);
    const publicCardPacksCount = useAppSelector(state => state.login.publicCardPacksCount);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(name);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(title);
    }

    useEffect(() => {
        dispatch(updateUserDataTC(title, avatar || userPhoto));
    }, [])

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        inputRef && inputRef.current && inputRef.current?.click();

        const file = e.target.files && e.target.files[0];
    }

    const activateViewMode = () => {
        setEditMode(false);
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 20) return;
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            activateViewMode();
        }
    }

    const updateName = () => {
        dispatch(updateUserDataTC(title, avatar || userPhoto));
        setEditMode(false);
    }

    const logoutHandler = () => dispatch(logoutTC());

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>;
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileLogOutButton}>
                <Button onClick={logoutHandler}>Log out</Button>
            </div>
            <div className={styles.profileWrapper}>
                <div className={styles.title}>Personal Information</div>
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .svg"
                    style={{display: 'none'}}
                    ref={inputRef}
                    onChange={upload}
                />
                <Badge
                    overlap="circular"
                    sx={{mb: '2rem'}}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    badgeContent={
                        <IconButton onClick={() => inputRef && inputRef.current && inputRef.current?.click()}>
                            <AddAPhotoIcon/>
                        </IconButton>}>
                    <Avatar alt="Avatar" src={avatar || userPhoto} sx={{width: 96, height: 96}}/>
                </Badge>
                <div>
                    {isEditMode
                        ? <TextField
                            onKeyPress={onKeyPressHandler}
                            onChange={changeTitle}
                            value={title}
                            label="Nickname"
                            variant="standard"
                            autoFocus
                            onBlur={activateViewMode}
                            InputProps={{endAdornment: (<IconButton><ClearIcon/></IconButton>)}}/>
                        : <div className={styles.nickName}>
                            <span className={styles.name}><b>Nickname:</b> {title}</span>
                            <IconButton onClick={activateEditMode}><ModeEditIcon fontSize="small"/></IconButton>
                        </div>}
                </div>
                <div className={styles.information}>
                    <div className={styles.description}><b>Contact email:</b> {email}</div>
                    <div><b>Number of decks created:</b> {publicCardPacksCount}</div>
                </div>
                <div>
                    <Button className={styles.button} onClick={updateName}>Save</Button>
                </div>
            </div>
        </div>
    )
};