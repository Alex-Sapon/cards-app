import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {CSSProperties, useEffect} from 'react';
import {ActionsType, useAppDispatch} from '../../app/store';

type AlertBarType = {
    message: string | null
    closeAlert?: () => ActionsType
    alertWrapper?: CSSProperties
}

export const AlertBar = ({message, closeAlert, alertWrapper}: AlertBarType) => {
    const dispatch = useAppDispatch();

    const handleCloseAlertBar = () => closeAlert && dispatch(closeAlert.call(this));

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                closeAlert && dispatch(closeAlert.call(this));
            }, 5000)
        }
    }, [message, dispatch, closeAlert]);

    return (
        <Stack sx={{position: 'absolute', bottom: '1rem', left: '1rem'}} spacing={2} style={alertWrapper}>
            <Alert severity="error" onClose={handleCloseAlertBar}>
                <AlertTitle sx={{alignItems: 'center', marginBottom: '0'}}>
                    <strong>{message}</strong>
                </AlertTitle>
            </Alert>
        </Stack>
    )
};