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

            const loadedPlayers = [];

            response.data.data.map(player => {
                console.log(player);
                loadedPlayers.push(new Player(player.id, player.name, player.team, player.score));
            });
            dispatch({ type: SET_PLAYERS, players: loadedPlayers });
        } catch (e) {
            throw e;
        }
    };
};
