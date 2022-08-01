import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Checkbox, FormControlLabel, IconButton} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import {BasicModal} from '../BasicModal';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import {ChangeEvent, useState} from 'react';
import {createNewCardsPack} from '../../../features/packsList/tablePacks/tablePacksReducer';
import {KeyboardEvent} from 'react'
import {handleCloseModal} from '../utilsModal';

//styles
const headerModalStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBlockEnd: '1px solid rgba(128, 128, 128, .5)',

};
const buttonsModalStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    borderRadius: '15px'
};
const buttonStyle = {
    borderRadius: '15px',
    minWidth: '100px'
};


export const AddPackModal = () => {

    const dispatch = useAppDispatch();

    const nameModal = useAppSelector(state => state.modal.name)

    const [value, setValue] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState(false)

    const handleClose = () => handleCloseModal(dispatch)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);
    const handleChangePrivate = (e: ChangeEvent<HTMLInputElement>) => setIsPrivate(e.currentTarget.checked)
    const handleSave = () => {
        if (value === '') {
            return;
        } else {
            dispatch(createNewCardsPack(value.trim(), isPrivate));
            setValue('')
            setIsPrivate(false)
            handleClose();
        }
    };
    const enterInput = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter'){
            return handleSave()
        }
    }

    if (nameModal !== 'addPack') {
        return null
    }

    return (
        <div>
            <BasicModal>
                <Box sx={headerModalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new pack
                    </Typography>
                    <IconButton size="small" onClick={handleClose}>
                        <CancelIcon sx={{color: 'black'}}/>
                    </IconButton>
                </Box>

                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <FormControl sx={{height: '50px', mb: '0.5rem', width: '100%'}} variant="standard">
                        <InputLabel htmlFor="packName">Pack Name</InputLabel>
                        <Input
                            onKeyPress={enterInput}
                            value={value}
                            onChange={handleChange}
                            size="small"
                            id="packName"
                            fullWidth
                        />
                    </FormControl>
                </Typography>

                <FormControlLabel
                    label="Private pack"
                    sx={{mb: 1, mt: 1}}
                    control={
                        <Checkbox
                            checked={isPrivate}
                            onChange={handleChangePrivate}
                            size="small"
                        />}
                />
                <Box sx={buttonsModalStyle}>
                    <Button variant="contained" sx={buttonStyle} onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" sx={buttonStyle} onClick={handleSave}>Save</Button>
                </Box>
            </BasicModal>
        </div>
    )
}