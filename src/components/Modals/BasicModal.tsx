import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {ReactNode} from 'react';
import styles from './BasicModal.module.css';

export type ModalType = 'add' | 'edit' | 'delete' | 'close';

export type ModalPropsType = {
    onClose: () => void
    children?: ReactNode
}

export const BasicModal: React.FC<ModalPropsType> = ({onClose, children}) => {
    return (
        <Modal
            open
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.wrapper}>
                {children}
            </Box>
        </Modal>
    );
}