import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as playersActions from '../store/actions/players.actions';
import { subscribeToPlayers } from '../utils/socket';

import List from './List';

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            team: null,
            score: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        subscribeToPlayers((err, data) => this.props.onSetPlayers(data));
    }

    componentDidMount() {
        this.props.onFetchPlayers();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, team, score } = this.state;
        this.props.onAddPlayer({ name, team, score });
    }

    render() {
        return (
            <>
                <h1>League Champion</h1>
                <List players={this.props.players} onDelete={this.props.onDeletePlayer} />
                <br />
                <form onSubmit={this.handleSubmit}>
                    <h4>Add new players</h4>
                    <input name="name" placeholder="player name" onChange={this.handleChange} />
                    <input name="team" placeholder="team name" onChange={this.handleChange} />
                    <input name="score" placeholder="team score" onChange={this.handleChange} />
                    <button>Add</button>
                </form>
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
