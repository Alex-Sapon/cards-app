import React from 'react';
import Slider from '@mui/material/Slider';
import styles from './ShowPacks.module.css';
import Button from '../../../common/button/Button';
import {setMaxNumberCards, setMinNumberCards, setUserId} from '../tablePacks/tablePacksReducer';
import {useAppDispatch, useAppSelector} from '../../../assets/utils/hooks';

export const ShowPacks = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);
    const user_id = useAppSelector(state => state.tablePacks.user_id);
    const loginUserId = useAppSelector(state => state.login._id);
    const min = useAppSelector(state => state.tablePacks.min);
    const max = useAppSelector(state => state.tablePacks.max);

    const [value, setValue] = React.useState<number[]>([min, max]);

    const handleSliderChange = (event: Event, newValue: number | number[])  => setValue(newValue as number[]);

    const showMyPacksClickHandler = () => dispatch(setUserId(loginUserId));

    const showAllPacksClickHandler = () => dispatch(setUserId(''));

    const handleClick = () => {
        dispatch(setMinNumberCards(value[0]));
        dispatch(setMaxNumberCards(value[1]));
    }

    return (
        <div className={styles.left_bar}>
            <h3 className={styles.left_bar_title}>Show packs cards</h3>
            <div className={styles.button_group}>
                <Button
                    onClick={showMyPacksClickHandler}
                    disabled={status === 'loading'}
                    className={user_id ? styles.btn_active : ''}
                    >My</Button>
                <Button
                    onClick={showAllPacksClickHandler}
                    disabled={status === 'loading'}
                    className={!user_id ? styles.btn_active: ''}
                >All</Button>
            </div>
            <h3 className={styles.left_bar_subtitle}>Number of cards</h3>
            <div className={styles.slider}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleSliderChange}
                    valueLabelDisplay="on"
                    max={110}
                    disabled={status === 'loading'}
                    onChangeCommitted={handleClick}
                />
            </div>
        </div>
    )
};