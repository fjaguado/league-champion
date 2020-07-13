import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as playersActions from '../../store/actions/players.actions';
import { subscribeToPlayers } from '../../utils/socket';

import List from '../UI/List';
import AddPlayer from './AddPlayer';
import Button from '@marketgoo/ola/dist/Button';
import Panel from '@marketgoo/ola/dist/Panel';
import PanelContent from '@marketgoo/ola/dist/Panel/Content';
import LoadingOverlay from '../UI/LoadingOverlay';

import './style.css';

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingItems: false,
            isAddPlayerFormVisible: false,
        };
        subscribeToPlayers((err, data) => this.props.onSetPlayers(data));
        this.deletePlayerHandler = this.deletePlayerHandler.bind(this);
        this.addNewPlayer = this.addNewPlayer.bind(this);
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

    async addNewPlayer(player) {
        this.setState({ isAddPlayerFormVisible: false });
        this.setState({ isLoading: true });
        await this.props.onAddPlayer(player);
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <>
                <h1 className="title">League Champion</h1>
                <Button
                    as="button"
                    className="add-players-button"
                    onClick={() => this.setState({ isAddPlayerFormVisible: true })}
                    variant="primary">
                    Add new player
                </Button>
                <AddPlayer
                    isFormVisible={this.state.isAddPlayerFormVisible}
                    onSubmit={this.addNewPlayer}
                    onCancel={() => this.setState({ isAddPlayerFormVisible: false })}
                />
                <Panel>
                    <PanelContent>
                        <List
                            isLoading={this.state.isLoadingItems}
                            items={this.props.players}
                            onDelete={this.deletePlayerHandler}
                        />
                    </PanelContent>
                </Panel>
                <LoadingOverlay show={this.state.isLoading} />
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
