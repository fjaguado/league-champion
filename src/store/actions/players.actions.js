import axios from 'axios';
import Player from '../../models/player';

export const SET_PLAYERS = 'SET_PLAYERS';
export const ADD_PLAYER = 'ADD_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';

export const fetchPlayers = () => {
    return async dispatch => {
        try {
            const response = await axios.get('/players');

            if (response.status !== 200) {
                throw new Error('Something went wrong!');
            }

            dispatch(setPlayers(response.data.data));
        } catch (e) {
            throw e;
        }
    };
};

export const setPlayers = players => {
    return dispatch => {
        const loadedPlayers = [];

        players.map(player =>
            loadedPlayers.push(new Player(player.id, player.name, player.team, player.score)),
        );
        dispatch({ type: SET_PLAYERS, players: loadedPlayers });
    };
};

export const addPlayer = player => {
    return async dispatch => {
        try {
            const response = await axios.post('/players', player);

            if (response.status !== 200) {
                throw new Error('Something went wrong!');
            }

            dispatch({ type: ADD_PLAYER, player });
        } catch (e) {
            throw e;
        }
    };
};

export const deletePlayer = playerId => {
    return async dispatch => {
        try {
            const response = await axios.delete(`/players/${playerId}`);

            if (response.status !== 200) {
                throw new Error('Something went wrong!');
            }

            dispatch({ type: DELETE_PLAYER, playerId });
        } catch (e) {
            throw e;
        }
    };
};
