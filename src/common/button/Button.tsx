import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import styles from './Button.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    remove?: boolean
};

const Button: React.FC<ButtonPropsType> = props => {
    const {red, remove, className, ...restProps} = props;

    const finalClassName = `${styles.button} ${red ? styles.red : ''} ${remove ? styles.remove : ''} ${className ? className : ''}`

    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
};

export default Button;
