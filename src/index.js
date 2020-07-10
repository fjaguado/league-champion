import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:3000';
import './index.css';

import List from './components/List';
import { Provider } from 'react-redux';

const Root = () => {
    return (
        <Provider>
            <h1>League Champion</h1>
            <List />
        </Provider>
    );
};

const container = document.getElementById('app');
ReactDOM.render(<Root />, container);

const socket = socketIOClient(ENDPOINT);
socket.on('update/players', data => {
    console.log(data);
});
