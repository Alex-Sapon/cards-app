import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IconButton} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import {BasicModal} from '../BasicModal';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {handleCloseModal} from '../utilsModal';
import {deleteUpdateCardsPack} from '../../../features/packsList/tablePacks/tablePacksReducer';

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

export const DeletePackModal =() => {

    const dispatch = useAppDispatch()

    const nameModal = useAppSelector(state => state.modal.name)
    const packName = useAppSelector(state => state.tablePacks.name)
    const id = useAppSelector(state => state.tablePacks.packId)

    const handleClose = () => handleCloseModal(dispatch)
    const handleDelete = () => {
        dispatch(deleteUpdateCardsPack(id))
        handleClose()
    }

    if (nameModal !== 'deletePack'){
        return null
    }
    return (
        <div>
            <BasicModal>
                <Box sx={headerModalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Pack
                    </Typography>
                    <IconButton size='small' onClick={handleClose}>
                        <CancelIcon sx={{color: 'black'}}/>
                    </IconButton>
                </Box>
                <Typography id="modal-modal-description" sx={{ mt: 7 }}>
                    Do you really want to remove <b>{packName}</b> pack?
                    <div>
                        All cards will be excluded from this course
                    </div>
                </Typography>
                <Box sx={buttonsModalStyle}>
                    <Button variant='contained' sx={buttonStyle} onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' color='error' sx={buttonStyle} onClick={handleDelete}>Delete</Button>
                </Box>
            </BasicModal>
        </div>
    );
}
