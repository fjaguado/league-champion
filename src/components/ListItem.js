import React, { useState } from 'react';

import TableCell from '@marketgoo/ola/dist/Table/Cell';
import TableRow from '@marketgoo/ola/dist/Table/Row';
import Button from '@marketgoo/ola/dist/Button';
import ConfirmModal from './ConfirmModal';

const ListItem = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onDelete = () => {
        setIsModalOpen(false);
        props.onDelete(props.item.id);
    };

    return (
        <TableRow check={null} checked={false}>
            <TableCell header={false}>{props.item.name}</TableCell>
            <TableCell header={false}>{props.item.team}</TableCell>
            <TableCell header={false}>{props.item.score}</TableCell>
            <TableCell header={false} variant="right">
                <Button
                    as="button"
                    onClick={() => setIsModalOpen(true)}
                    variant="destructive-primary">
                    Delete
                </Button>
            </TableCell>
            <ConfirmModal
                title="You are about to delete this item"
                question="Are you sure?"
                confirmLabel="Yes, delete it"
                cancelLabel="No, cancel"
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onConfirm={onDelete}
            />
        </TableRow>
    );
};

export default ListItem;
