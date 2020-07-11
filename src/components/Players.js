import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as playersActions from '../store/actions/players.actions';
import { subscribeToPlayers } from '../utils/socket';

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
                        {this.props.players &&
                            this.props.players.map(player => (
                                <tr>
                                    <td>{player.name}</td>
                                    <td>{player.team}</td>
                                    <td>{player.score}</td>
                                    <td>
                                        <button
                                            onClick={() => this.props.onDeletePlayer(player.id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
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
