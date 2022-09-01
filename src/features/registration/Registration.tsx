import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {FormGroup} from '@mui/material';
import {Button} from '../../common/button';
import {Form} from '../../common/form';
import styles from './Registration.module.css';
import * as React from 'react';
import {PATH} from '../../enums/path';
import {useFormik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {userRegister} from './reducer/registrationReducer';
import {useAppDispatch, useAppSelector, useShowPassword} from '../../assets/utils/hooks';
import {MAX_LENGTH_PASSWORD} from '../../constants';
import {selectAppStatus} from 'app';
import {selectIsLoggedIn} from '../login';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectAppStatus);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const {isShow: isShowPassword, setShowPassword: showPass} = useShowPassword();
    const {isShow: isShowConfirmPassword, setShowPassword: showConfirmPass} = useShowPassword();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length <= MAX_LENGTH_PASSWORD) {
                errors.password = `Password should be more than ${MAX_LENGTH_PASSWORD} symbols`;
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Please, confirm your password';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password is incorrect';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(userRegister(values.email, values.password));
            formik.resetForm({values: {email: values.email, password: '', confirmPassword: ''}});
        },
    });

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <>
            <Form onSubmit={formik.handleSubmit} title="Registration">
                <FormGroup sx={{width: '80%'}}>
                    <FormControl sx={{height: '71px', mb: '0.5rem', width: '100%'}} variant="standard">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            {...formik.getFieldProps('email')}
                            id="email"
                            fullWidth
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email &&
                        formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    </FormControl>
                    <FormControl sx={{height: '71px', mb: '0.5rem', width: '100%'}} variant="standard">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            {...formik.getFieldProps('password')}
                            id="password"
                            type={isShowPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={showPass}>
                                        {isShowPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.password &&
                        formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                    </FormControl>
                    <FormControl sx={{height: '71px', mb: '0.5rem'}} variant="standard">
                        <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                        <Input
                            id="confirmPassword"
                            type={isShowConfirmPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={showConfirmPass}>
                                        {isShowConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword
                            ? <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                    </FormControl>
                    <div className={styles.button_group}>
                        <Button type={'submit'} disabled={status === 'loading'}>Registration</Button>
                    </div>
                </FormGroup>
                <NavLink
                    style={{pointerEvents: status === 'loading' ? 'none' : undefined}}
                    className={styles.login}
                    to={PATH.LOGIN}
                >Are you already registered?</NavLink>
            </Form>

        </>
    );
};





