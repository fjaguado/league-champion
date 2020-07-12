import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as playersActions from '../store/actions/players.actions';
import { subscribeToPlayers } from '../utils/socket';

import List from './List';
import AddPlayer from './AddPlayer';
import Spinner from '@marketgoo/ola/dist/Spinner';

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingItems: false,
        };
        subscribeToPlayers((err, data) => this.props.onSetPlayers(data));
        this.deletePlayerHandler = this.deletePlayerHandler.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoadingItems: true });
        await this.props.onFetchPlayers();
        this.setState({ isLoadingItems: false });
    }

    async deletePlayerHandler(playerId) {
        this.setState({ isLoading: true });
        await this.props.onDeletePlayer(playerId);
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <>
                <h1 className="title">League Champion</h1>
                <List
                    isLoading={this.state.isLoadingItems}
                    items={this.props.players}
                    onDelete={this.deletePlayerHandler}
                />
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
