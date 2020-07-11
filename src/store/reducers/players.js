import { ADD_PLAYER, DELETE_PLAYER, SET_PLAYERS } from '../actions/players.actions';

const initialState = {
    players: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYERS: {
            return {
                ...state,
                players: action.players,
            };
        }
        case ADD_PLAYER: {
            return {
                ...state,
                players: state.players.concat(action.player),
            };
        }
        case DELETE_PLAYER: {
            return {
                ...state,
                players: state.players.filter(player => player.id !== action.playerId),
            };
        }
        default:
            return state;
    }
};
