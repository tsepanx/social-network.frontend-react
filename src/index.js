import React from "react";
import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import './index.css';

import App from "./App";
import store from "./state";

let rerenderTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode><App
                state={state}
                dispatch={store.dispatch.bind(store)}
            /></React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
// debugger
rerenderTree(store.getState())
store.subscribe(rerenderTree)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
