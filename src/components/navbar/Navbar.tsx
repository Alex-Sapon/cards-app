import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';
import {PATH} from '../../enums/path';

export const Navbar = () => {
    const setActiveClass = (navData: { isActive: boolean }): string => {
        return navData.isActive ? styles.active : styles.navbar_item;
    }

    return (
        <div className={styles.navbar_container}>
            <nav className={styles.navbar_list}>
                <NavLink to={PATH.PACKS} className={setActiveClass}>Packs List</NavLink>
                <NavLink to={PATH.USERS} className={setActiveClass}>Users</NavLink>
                <NavLink to={PATH.USER_CHAT} className={setActiveClass}>Users chat</NavLink>
                <NavLink to={PATH.PROFILE} className={setActiveClass}>Profile</NavLink>
            </nav>
        </div>
    )
}