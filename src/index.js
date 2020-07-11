import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import List from './components/List';
import { Provider } from 'react-redux';
import playersReducer from './store/reducers/players';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Players from './components/Players';

const reducer = combineReducers({
    players: playersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

const Root = () => {
    return (
        <Provider store={store}>
            <Players />
        </Provider>
    );
};

const container = document.getElementById('app');
ReactDOM.render(<Root />, container);
