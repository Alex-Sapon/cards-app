import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react';
import styles from './InputText.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type InputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanStyles?: string
    wrapperStyles?: string
}

const InputText: React.FC<InputTextPropsType> = props => {
    const {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText, onKeyPress, onEnter,
        error, className, spanStyles, wrapperStyles, ...restProps
    } = props;

    const [value, setValue] = useState<string>('')

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    };

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter();
        if (onChangeText){
            onChangeText(value)
        }
    }

    const inputWrapper = `${styles.wrapper} ${wrapperStyles ? wrapperStyles : ''}`;
    const spanClassName = `${styles.error} ${spanStyles ? spanStyles : ''}`;
    const inputClassName = `${styles.input} ${error ? styles.error_input : styles.input} ${className ? className : ''}`;

    return (
        <div className={inputWrapper}>
            <input
                value={value}
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={inputClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            {error && <div className={spanClassName}>{error}</div>}
        </div>
    )
};

export default InputText;

