import { SET_PLAYERS } from '../actions/players.actions';

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
        default:
            return state;
    }
};
