import React from "react";
import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import './index.css';

import App from "./App";
import store from "./redux/store";
import {Provider} from "react-redux";

let rerenderTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <React.StrictMode><App
                    // state={state}
                    // dispatch={store.dispatch.bind(store)}
                /></React.StrictMode>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
// debugger
rerenderTree(store.getState())

// store.subscribe(rerenderTree)
store.subscribe(() => rerenderTree(store.getState()))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
