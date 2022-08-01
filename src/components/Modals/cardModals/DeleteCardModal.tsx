import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IconButton} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import {BasicModal} from '../BasicModal';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {handleCloseModal} from '../utilsModal';
import {removeCardTC} from '../../../features/packName/reducer/packCardReducer';

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
}


export const DeleteCardModal = () => {

    const dispatch = useAppDispatch()

    const nameModal = useAppSelector(state => state.modal.name)
    const id = useAppSelector(state => state.cardPack.cardId)
    const cardName = useAppSelector(state => state.cardPack.question)

    const handleClose = () => handleCloseModal(dispatch)
    const handleDelete = () => {
        dispatch(removeCardTC(id))
        handleClose()
    }


    if (nameModal !== 'deleteCard') {
        return null
    }

    return (
        <div>
            <BasicModal>
                <Box sx={headerModalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Card
                    </Typography>
                    <IconButton size='small' onClick={handleClose}>
                        <CancelIcon sx={{color: 'black'}}/>
                    </IconButton>
                </Box>
                <Typography id="modal-modal-description" sx={{ mt: 12 }}>
                    Do you really want to remove <b>{cardName}</b> card?
                </Typography>
                <Box sx={buttonsModalStyle}>
                    <Button variant='contained' sx={buttonStyle} onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' color='error' sx={buttonStyle} onClick={handleDelete}>Delete</Button>
                </Box>
            </BasicModal>
        </div>
    );
}
