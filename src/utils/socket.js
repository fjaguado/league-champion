import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
const socket = socketIOClient(ENDPOINT);

function subscribeToPlayers(cb) {
    socket.on('update/players', data => cb(null, data));
}

export { subscribeToPlayers };
