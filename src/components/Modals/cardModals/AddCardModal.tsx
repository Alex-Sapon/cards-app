import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IconButton} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import {BasicModal} from '../BasicModal';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import {handleCloseModal} from '../utilsModal';
import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {addCardTC} from '../../../features/packName/reducer/packCardReducer';

//styles
const headerModalStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBlockEnd: '1px solid rgba(128, 128, 128, .5)',
}
const buttonsModalStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    borderRadius: '15px'
}
const buttonStyle = {
    borderRadius: '15px',
    minWidth: '100px'
}

export const AddCardModal = () => {

    const dispatch = useAppDispatch()

    const nameModal = useAppSelector(state => state.modal.name)
    const cardsPack_id = useAppSelector(state => state.cardPack.cardsPack_id)

    const [questionValue, setQuestionValue] = useState<string>('');
    const [answerValue, setAnswerValue] = useState<string>('');

    const handleClose = () => handleCloseModal(dispatch)
    const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => setQuestionValue(e.currentTarget.value);
    const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => setAnswerValue(e.currentTarget.value);
    const handleSave = () => {
        if (questionValue === '') {
            return;
        } else if(answerValue === ''){
            return;
        } else {
            dispatch(addCardTC(cardsPack_id, questionValue.trim(), answerValue.trim()));
            setAnswerValue('')
            setQuestionValue('')
            handleClose();
        }
    };
    const enterInput = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter'){
            return handleSave()
        }
    }

    if (nameModal !== 'addCard') {
        return null
    }

    return (
        <div>
            <BasicModal>
                <Box sx={headerModalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new card
                    </Typography>
                    <IconButton size='small' onClick={handleClose}>
                        <CancelIcon sx={{color: 'black'}}/>
                    </IconButton>
                </Box>

                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    <FormControl sx={{height: '50px', mb: '0.5rem', width: '100%'}} variant="standard">
                        <InputLabel htmlFor="packName">Question</InputLabel>
                        <Input
                            onKeyPress={enterInput}
                            value={questionValue}
                            onChange={handleQuestionChange}
                            size='small'
                            id="packName"
                            fullWidth
                        />
                    </FormControl>
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    <FormControl sx={{height: '50px', mb: '0.5rem', width: '100%'}} variant="standard">
                        <InputLabel htmlFor="packName">Answer</InputLabel>
                        <Input
                            onKeyPress={enterInput}
                            value={answerValue}
                            onChange={handleAnswerChange}
                            size='small'
                            id="packName"
                            fullWidth
                        />
                    </FormControl>
                </Typography>

                <Box sx={buttonsModalStyle}>
                    <Button variant='contained' sx={buttonStyle} onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' sx={buttonStyle} onClick={handleSave}>Save</Button>
                </Box>
            </BasicModal>
        </div>
    );
}
