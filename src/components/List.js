import React, { Component, useCallback, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as playersActions from '../store/actions/players.actions';
import axios from 'axios';
import { subscribeToPlayers } from '../utils/socket';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            name: null,
            team: null,
            score: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        subscribeToPlayers((err, data) => this.props.onSetPlayers(data));
    }

    componentDidMount() {
        axios.get('/players').then(response => {
            this.setState({ data: response.data });
        });
        this.props.onFetchPlayers();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, team, score } = this.state;
        axios.post('/players', { name, team, score }).then(() => {
            axios.get('/players').then(response => {
                this.setState({ data: response.data });
            });
        });
    }

    handleDelete(id) {
        axios.delete(`/players/${id}`).then(() => {
            axios.get('/players').then(response => {
                this.setState({ data: response.data });
            });
        });
    }

    render() {
        const players = this.state.data;

        return (
            <>
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
                            this.props.players.map(x => (
                                <tr>
                                    <td>{x.name}</td>
                                    <td>{x.team}</td>
                                    <td>{x.score}</td>
                                    <td>
                                        <button onClick={() => this.handleDelete(x.id)}>
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
                    <input
                        name="name"
                        placeholder="player name"
                        onChange={this.handleChange}></input>
                    <input name="team" placeholder="team name" onChange={this.handleChange}></input>
                    <input
                        name="score"
                        placeholder="team score"
                        onChange={this.handleChange}></input>
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
        onSetPlayers: players => dispatch({ type: playersActions.SET_PLAYERS, players }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
