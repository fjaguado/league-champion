import React from 'react';

import TableCell from '@marketgoo/ola/dist/Table/Cell';
import ButtonIcon from '@marketgoo/ola/dist/ButtonIcon';
import Icon from '@marketgoo/ola/dist/Icon';
import TableRow from '@marketgoo/ola/dist/Table/Row';

const ListItem = props => {
    return (
        <TableRow check={null} checked={false}>
            <TableCell header={false}>{props.player.name}</TableCell>
            <TableCell header={false}>{props.player.team}</TableCell>
            <TableCell header={false}>{props.player.score}</TableCell>
            <TableCell header={false}>
                <ButtonIcon
                    as="button"
                    busy={false}
                    disabled={false}
                    variant="primary"
                    onClick={() => props.onDelete(props.player.id)}>
                    <Icon className={null} name="close" size="medium" />
                </ButtonIcon>
            </TableCell>
        </TableRow>
    );
};

export default ListItem;
