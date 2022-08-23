import styles from './SendEmail.module.css';
import Mail from '../../../assets/images/mail.svg';
import {useAppSelector} from '../../../assets/utils/hooks';

export const SendEmail = () => {
    const email = useAppSelector(state => state.recoveryPassword.email);

    return (
        <div className={styles.wrapper}>
            <div className={styles.image_wrapper}>
                <img src={Mail} alt="Mail" className={styles.image}/>
            </div>
            <h3 className={styles.title}>Check Email</h3>
            <div className={styles.subtitle}>{`We've sent Email with instructions to ${email}`}</div>
        </div>
    )
};