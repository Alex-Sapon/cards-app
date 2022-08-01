import styles from './Error404.module.css';

export const Error404 = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Error 404</h2>
            <h3 className={styles.subtitle}>Page not found</h3>
        </div>
    )
}