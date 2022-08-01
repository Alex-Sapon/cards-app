import {ReactNode} from 'react';
import styles from './Form.module.css';

type FormType = {
    title?: string
    children: ReactNode
    onSubmit: () => void
    formWrapper?: string
}

export const Form = (props: FormType) => {
    const {title, children, onSubmit, formWrapper} = props;

    return (
        <div className={`${styles.wrapper} ${formWrapper ? formWrapper : ''}`}>
            <h3 className={styles.title}>{title}</h3>
            <form className={styles.form} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
};