import {ChangeEvent, useState} from 'react';

export const useInputChange = () => {
    const [value, setValue] = useState('');

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

    return {value, onInputChange};
}