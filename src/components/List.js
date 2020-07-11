import React from 'react';

import ButtonIcon from '@marketgoo/ola/dist/ButtonIcon';
import Icon from '@marketgoo/ola/dist/Icon';
import Table from '@marketgoo/ola/dist/Table';
import TableRow from '@marketgoo/ola/dist/Table/Row';
import TableCell from '@marketgoo/ola/dist/Table/Cell';

const List = props => {
    return (
        <Table responsive={false} sticky={false} stiky>
            <thead>
                <TableRow check={null} checked={false}>
                    <TableCell header>Player</TableCell>
                    <TableCell header>Team</TableCell>
                    <TableCell header>Score</TableCell>
                    <TableCell header>Actions</TableCell>
                </TableRow>
            </thead>
            <tbody>
                {props.players &&
                    props.players.map(player => (
                        <TableRow check={null} checked={false}>
                            <TableCell header={false}>{player.name}</TableCell>
                            <TableCell header={false}>{player.team}</TableCell>
                            <TableCell header={false}>{player.score}</TableCell>
                            <TableCell header={false}>
                                <ButtonIcon
                                    as="button"
                                    busy={false}
                                    disabled={false}
                                    variant="primary"
                                    onClick={() => props.onDelete(player.id)}>
                                    <Icon className={null} name="close" size="medium" />
                                </ButtonIcon>
                            </TableCell>
                        </TableRow>
                    ))}
            </tbody>
        </Table>
    );
};

export default List;
