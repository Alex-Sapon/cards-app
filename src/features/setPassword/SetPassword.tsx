import {useFormik} from 'formik';
import {Button} from '../../common/button';
import {Form} from '../../common/form';
import {AppStateType} from '../../app/store';
import {PATH} from '../../enums/path';
import {FormControl, FormGroup, IconButton, InputAdornment, InputLabel} from '@mui/material';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, {useEffect} from 'react';
import {Navigate, useParams} from 'react-router';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import styles from './SetPassword.module.css';
import {initializeApp, RequestStatusType} from '../../app/reducer/appReducer';
import {updateNewPassword} from './reducer/setPasswordReducer';
import {useAppDispatch, useAppSelector, useShowPassword} from '../../assets/utils/hooks';
import {MAX_LENGTH_PASSWORD} from '../../constants';

type SetPasswordErrorType = {
    password?: string
}

const selectIsUpdatePassword = (state: AppStateType): boolean => state.setPassword.isUpdatePassword;
const selectStatus = (state: AppStateType): RequestStatusType => state.app.status;

export const SetPassword = () => {
    const dispatch = useAppDispatch();

    const {isShow, setShowPassword} = useShowPassword();

    const {token} = useParams<'token'>();

    const isUpdatePassword = useAppSelector(selectIsUpdatePassword);
    const status = useAppSelector(selectStatus);

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate(values) {
            const errors: SetPasswordErrorType = {};

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= MAX_LENGTH_PASSWORD) {
                errors.password = `Password should be more than ${MAX_LENGTH_PASSWORD} symbols`;
            }

            return errors;
        },
        onSubmit: values => {
            if (values.password && token) {
                const data = {password: values.password, resetPasswordToken: token};

                dispatch(updateNewPassword(data));
                formik.resetForm();
            }
        }
    });

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch]);

    if (isUpdatePassword) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <Form onSubmit={formik.handleSubmit} title="Create new password" formWrapper={styles.container}>
                <FormGroup sx={{width: '80%'}}>
                    <FormControl variant="standard" sx={{height: '71px', width: '100%'}}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type={isShow ? 'text' : 'password'}
                            disabled={status === 'loading'}
                            endAdornment={
                                <InputAdornment position="end">
                                    {status === 'loading'
                                        ? <LoadingButton loading variant="text" sx={{minWidth: '24px'}}/>
                                        :<IconButton
                                            onClick={setShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            className={styles.view}
                                        >
                                            {isShow ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>}
                                </InputAdornment>}
                            {...formik.getFieldProps('password')}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {formik.touched.password && !!formik.errors.password && formik.errors.password}
                        </FormHelperText>
                    </FormControl>
                </FormGroup>
                <div className={styles.title}>Create new password and we will send you further instructions to email</div>
                <Button type="submit" className={styles.button} disabled={status === 'loading'}>Create new password</Button>
            </Form>
        </>
    )
}
