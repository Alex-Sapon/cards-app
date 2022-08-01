import {ActionsType} from '../../app/store';
import {NameModalType, setNameModalAC, setOpenModalAC} from './reducer/modalReducer';
import {Dispatch} from 'redux';


export const handleOpenModal = (dispatch: Dispatch<ActionsType>, name: NameModalType) => {
    dispatch(setOpenModalAC(true))
    dispatch(setNameModalAC(name))
}
export const handleCloseModal = (dispatch: Dispatch<ActionsType>) => {
    dispatch(setOpenModalAC(false))
    dispatch(setNameModalAC(null))
}