import { ADD_PLAYER, SET_PLAYERS } from '../actions/players.actions';

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
        default:
            return state;
    }
};
