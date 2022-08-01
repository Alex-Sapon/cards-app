import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';
import {PATH} from '../../enums/path';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {RequestStatusType} from '../../app/reducer/app-reducer';
import {AppStateType, useAppSelector} from '../../app/store';

const selectStatus = (state: AppStateType): RequestStatusType => state.app.status;

export const Navbar = () => {
    const setActiveClass = (navData: { isActive: boolean }): string => {
        return navData.isActive ? styles.active : styles.navbar_item;
    }

    const status = useAppSelector(selectStatus);

    return (
        <div className={styles.navbar_container}>
            <nav className={styles.navbar_list}>
                <NavLink to={PATH.PACKS} className={setActiveClass}>Packs List</NavLink>
                <NavLink to={PATH.PROFILE} className={setActiveClass}>Profile</NavLink>
            </nav>
            {status === 'loading' && <LinearProgress sx={{position: 'absolute', width: '100%', top: '51px'}}/>}
        </div>
    )
}