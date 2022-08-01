import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import styles from './Select.module.css'

type DefaultSelectType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SelectType = DefaultSelectType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

const Select: React.FC<SelectType> = ({options, onChange, onChangeOption, className, ...restProps}) => {
    const mappedOptions: JSX.Element[] = options ? options.map((item, i) => 
        <option key={i} value={item} className={styles.option}>{item}</option>
    ) : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const finalSelectStyles = styles.select + (className ? ' ' + className : '')

    return (
        <select onChange={onChangeCallback} {...restProps} className={finalSelectStyles}>
            {mappedOptions}
        </select> 
    )
}

export default Select;
