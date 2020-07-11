import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as playersActions from '../store/actions/players.actions';
import { subscribeToPlayers } from '../utils/socket';

import List from './List';
import AddPlayer from './AddPlayer';

class Players extends Component {
    constructor(props) {
        super(props);
        subscribeToPlayers((err, data) => this.props.onSetPlayers(data));
    }

    componentDidMount() {
        this.props.onFetchPlayers();
    }

    render() {
        return (
            <>
                <h1>League Champion</h1>
                <List players={this.props.players} onDelete={this.props.onDeletePlayer} />
                <br />
                <AddPlayer onSubmit={this.props.onAddPlayer} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        players: state.players.players,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPlayers: () => dispatch(playersActions.fetchPlayers()),
        onSetPlayers: players => dispatch(playersActions.setPlayers(players)),
        onAddPlayer: player => dispatch(playersActions.addPlayer(player)),
        onDeletePlayer: playerId => dispatch(playersActions.deletePlayer(playerId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
