import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './redux/redux-store';
import {BrowserRouter} from 'react-router-dom';

const renderTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={store.getState()} dispatch={store.dispatch.bind(store)}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
};


renderTree();

store.subscribe(renderTree);
