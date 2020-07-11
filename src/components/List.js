import React from 'react';

const List = props => {
    return (
        <table>
            <thead>
                <tr>
                    <td>Player</td>
                    <td>Team</td>
                    <td>Score</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {props.players &&
                    props.players.map(player => (
                        <tr>
                            <td>{player.name}</td>
                            <td>{player.team}</td>
                            <td>{player.score}</td>
                            <td>
                                <button onClick={() => props.onDelete(player.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default List;
