import {Button} from '../../common/button';
import {Form} from '../../common/form';
import styles from './Login.module.css';
import {useFormik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {PATH} from '../../enums/path';
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputAdornment,
	InputLabel
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import React, {useState} from 'react';
import {AppStateType} from '../../app/store';
import {login} from './reducer/loginReducer';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {RequestStatusType} from '../../app/reducer/appReducer';
import {useAppDispatch, useAppSelector} from '../../assets/utils/hooks';

const selectIsLoggedIn = (state: AppStateType): boolean => state.login.isLoggedIn;
const selectStatus = (state: AppStateType): RequestStatusType => state.app.status;

export const Login = () => {
	const dispatch = useAppDispatch();

	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const status = useAppSelector(selectStatus);

	const [showPassword, setShowPassword] = useState(false);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if (status === 'loading') {
			e.preventDefault();
		}
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
		validate(values) {
			const errors: LoginErrorType = {};

			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length <= 8) {
				errors.password = 'Password should be more than 8 symbols';
			}

			return errors;
		},
		onSubmit: values => {
			dispatch(login(values));
			formik.resetForm({values: {email: values.email, password: '', rememberMe: false}});
		}
	});

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	if (isLoggedIn) return <Navigate to={PATH.PROFILE}/>

	return (
		<>
			<Form onSubmit={formik.handleSubmit} title="Sign In">
				<FormGroup sx={{width: '80%'}}>
					<FormControl variant="standard" sx={{height: '71px', mb: '0.5rem'}}>
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input
							id="email"
							fullWidth
							disabled={status === 'loading'}
							{...formik.getFieldProps('email')}
						/>
						<FormHelperText sx={{color: 'red'}}>
							{formik.touched.email && !!formik.errors.email && formik.errors.email}
						</FormHelperText>
					</FormControl>
					<FormControl variant="standard" sx={{height: '71px', width: '100%'}}>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="password"
							type={showPassword ? 'text' : 'password'}
							disabled={status === 'loading'}
							endAdornment={
								<InputAdornment position="end">
									{status === 'loading'
										? <LoadingButton loading variant="text" sx={{minWidth: '24px'}}/>
										: <IconButton
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											className={styles.view}
										>
											{showPassword ? <Visibility/> : <VisibilityOff/>}
										</IconButton>}
								</InputAdornment>
							}
							{...formik.getFieldProps('password')}
						/>
						<FormHelperText sx={{color: 'red'}}>
							{formik.touched.password && !!formik.errors.password && formik.errors.password}
						</FormHelperText>
					</FormControl>
					<FormControlLabel
						label="remember me"
						sx={{mb: '1rem'}}
						control={
							<Checkbox
								size="small"
								checked={formik.values.rememberMe}
								disabled={status === 'loading'}
								sx={{'&.Mui-checked': {color: '#9991c8'}}}
								{...formik.getFieldProps('rememberMe')}
							/>}
					/>
				</FormGroup>
				<NavLink className={styles.forgot_pass} to={PATH.RECOVERY_PASS} onClick={handleClick}>Forgot
					Password</NavLink>
				<Button type="submit" className={styles.button} disabled={status === 'loading'}>Login</Button>
				<div className={styles.text}>Don't have an account?</div>
				<NavLink className={styles.link} to={PATH.REGISTRATION} onClick={handleClick}>Sign Up</NavLink>
			</Form>
			{/*{responseMessage && <AlertBar message={responseMessage} closeAlert={() => setAppErrorAC(null)}/>}*/}
		</>
	)
};

//types
type LoginErrorType = {
	email?: string
	password?: string
	rememberMe?: boolean
}