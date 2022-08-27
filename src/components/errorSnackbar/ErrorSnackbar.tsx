import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {setRegisterMessage} from '../../features/registration/reducer/registrationReducer';
import {setAppError} from '../../app';
import {useAppDispatch, useAppSelector} from '../../assets/utils/hooks';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch();

    const error = useAppSelector(state => state.app.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;

        dispatch(setRegisterMessage(null));
        dispatch(setAppError(null));
    }

    return (
        <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>{error}</Alert>
        </Snackbar>
    );
};