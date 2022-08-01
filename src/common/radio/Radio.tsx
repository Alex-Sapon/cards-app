import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import styles from './Radio.module.css'

type DefaultRadioType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type RadioType = DefaultRadioType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

const Radio: React.FC<RadioType> = (
    {
        type, name,
        options, value, className,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const finalRadioStyles = styles.super_radio + (className ? ' ' + className : '')

    const mappedOptions: JSX.Element[] = options ? options.map((o, i) => (
        <label key={name + '-' + i} className={styles.radio_label}>
            <input
                type={'radio'}
                name={name}
                checked={value === o}
                value={o}
                onChange={onChangeCallback}
                className={finalRadioStyles}
                {...restProps}
            />
            {o}
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default Radio;
