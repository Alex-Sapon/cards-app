import React from 'react';
import Slider from '@mui/material/Slider';
import styles from './ShowPacks.module.css';
import {Button} from '../../../common/button';
import {setMaxNumberCards, setMinNumberCards, setUserId} from '../tablePacks/tablePacksReducer';
import {useAppDispatch, useAppSelector} from '../../../assets/utils/hooks';
import {selectAppStatus} from '../../../app';
import {selectMaxGrade, selectMinGrade, selectUserId} from '../tablePacks';
import {selectLoginId} from '../../login';

export const ShowPacks = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectAppStatus);
    const user_id = useAppSelector(selectUserId);
    const loginUserId = useAppSelector(selectLoginId);
    const min = useAppSelector(selectMinGrade);
    const max = useAppSelector(selectMaxGrade);

    const [value, setValue] = React.useState<number[]>([min, max]);

    const handleSliderChange = (event: Event, newValue: number | number[])  => setValue(newValue as number[]);

    const onShowMyPacksClick = () => dispatch(setUserId(loginUserId));

    const onShowAllPacksClick = () => dispatch(setUserId(''));

    const onSliderClick = () => {
        dispatch(setMinNumberCards(value[0]));
        dispatch(setMaxNumberCards(value[1]));
    }

    const styleMyButton = user_id ? styles.btn_active : '';
    const styleAllButton = !user_id ? styles.btn_active: '';

    return (
        <div className={styles.left_bar}>
            <h3 className={styles.left_bar_title}>Show packs cards</h3>
            <div className={styles.button_group}>
                <Button onClick={onShowMyPacksClick} disabled={status === 'loading'} className={styleMyButton}>
                    My
                </Button>
                <Button onClick={onShowAllPacksClick} disabled={status === 'loading'} className={styleAllButton}>
                    All
                </Button>
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
                    onChangeCommitted={onSliderClick}
                />
            </div>
        </div>
    )
};