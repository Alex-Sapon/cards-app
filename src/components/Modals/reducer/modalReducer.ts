const initialState: ModalStateType = {
    isOpenModal: false,
    name: null,
};

export const modalReducer = (state: ModalStateType = initialState, action: ModalActionsType): ModalStateType => {
    switch (action.type) {
        case 'MODAL/SET-OPEN-MODAL':
            return {...state, isOpenModal: action.isOpen};
        case 'MODAL/SET-NAME-MODAL':
            return {...state, name: action.name}
        default:
            return state;
    }
};

//actions
export const setOpenModalAC = (isOpen: boolean) => ({type: 'MODAL/SET-OPEN-MODAL', isOpen} as const);
export const setNameModalAC = (name: NameModalType) => ({type: 'MODAL/SET-NAME-MODAL', name} as const);

//types
export type ModalStateType = {
    isOpenModal: boolean,
    name: NameModalType

}
export type NameModalType = null |'addPack' | 'deletePack' | 'editPack' | 'addCard' | 'deleteCard' | 'editCard'

export type ModalActionsType =
    | ReturnType<typeof setOpenModalAC>
    | ReturnType<typeof setNameModalAC>
