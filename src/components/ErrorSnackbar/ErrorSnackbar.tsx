import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {setRegisterMessageAC} from '../../features/registration/reducer/registrationReducer';
import {useAppDispatch, useAppSelector } from '../../app/store';
import { setAppErrorAC } from '../../app/reducer/app-reducer';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {

    const error = useAppSelector(state => state.app.error)
    const message = useAppSelector(state => state.registration.message)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setRegisterMessageAC(null))
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={error !== null || message !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={message ? 'success': 'error'} sx={{width: '100%'}}>
                {error || message}
            </Alert>
        </Snackbar>
    );
};