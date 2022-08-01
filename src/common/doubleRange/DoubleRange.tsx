import React, {ChangeEvent, useState} from 'react';
import styles from './DoubleRange.module.css';

type DefaultInputRangeType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type DoubleRangeType = DefaultInputRangeType & {
    onChangeRange?: (value: [number, number]) => void
    value: [number, number]
    min: number
    max: number
};

const DoubleRange: React.FC<DoubleRangeType> = props => {
    const {value, min, max, step, disabled, onChangeRange} = props;

    const [left, setLeft] = useState(value[0]);
    const [right, setRight] = useState(value[1]);

    const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRight(+e.currentTarget.value);
        if (value[0] + 5 < right) {
            onChangeRange && onChangeRange([value[0], +e.currentTarget.value]);
        }
    };

    const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLeft(+e.currentTarget.value);
        if (left + 5 < right) {
            onChangeRange && onChangeRange([+e.currentTarget.value, value[1]]);
        }
    };

    const progressBar = {
        left: `${value[0]}%`,
        right: `${100 - (value[1] / max * 100)}%`
    };

    return (
        <>
            <div className={styles.slider}>
                <div className={styles.slider_progress} style={progressBar}></div>
            </div>
            <div className={styles.slider_inputs}>
                <input
                    type="range"
                    min={min}
                    value={value[0]}
                    step={step}
                    disabled={disabled}
                    onChange={onChangeMinHandler}
                />
                <input
                    type="range"
                    max={max}
                    value={value[1]}
                    step={step}
                    disabled={disabled}
                    onChange={onChangeMaxHandler}
                />
            </div>
        </>
    )
};

export default DoubleRange;
