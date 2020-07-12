import ModalHeader from '@marketgoo/ola/dist/Modal/Header';
import ModalContent from '@marketgoo/ola/dist/Modal/Content';
import Modal from '@marketgoo/ola/dist/Modal';
import React from 'react';
import Button from '@marketgoo/ola/dist/Button';
import ButtonGroup from '@marketgoo/ola/dist/ButtonGroup';

const ConfirmModal = props => {
    return (
        <Modal open={props.isOpen} onClose={props.onCancel}>
            <ModalHeader title={props.title} />
            <ModalContent>
                <p>{props.question}</p>
                <ButtonGroup variant="center">
                    <Button as="button" onClick={props.onConfirm} variant="destructive-primary">
                        {props.confirmLabel}
                    </Button>
                </ButtonGroup>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmModal;
