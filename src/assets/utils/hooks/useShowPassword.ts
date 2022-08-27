import {useState} from 'react';

export const useShowPassword = () => {
    const [isShow, setIsShow] = useState(false);

    const setShowPassword = () => setIsShow(prev => !prev);

    return {isShow, setShowPassword};
}