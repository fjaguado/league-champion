import React from 'react';
import Table from '@marketgoo/ola/dist/Table';
import TableRow from '@marketgoo/ola/dist/Table/Row';
import TableCell from '@marketgoo/ola/dist/Table/Cell';
import ListItem from './ListItem';

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
                {props.items &&
                    props.items.map(item => <ListItem item={item} onDelete={props.onDelete} />)}
            </tbody>
        </Table>
    );
};

export default List;
