import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import styles from './Checkbox.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanStyles?: string
    labelStyles?: string
}

const Checkbox: React.FC<CheckboxPropsType> = props => {
    const {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked, className, spanStyles, labelStyles,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
        ...restProps
    } = props;

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${styles.checkbox} ${className ? className : ''}`;
    const finalspanClassName = `${styles.span} ${spanStyles ? spanStyles : ''}`;
    const finalLabelClassName = `${styles.label} ${labelStyles ? labelStyles : ''}`;

    return (
        <label className={finalLabelClassName}>
            <input
                type='checkbox'
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            {children && <span className={finalspanClassName}>{children}</span>}
        </label>
    )
};

export default Checkbox;
