import './index.css';
import * as serviceWorker from './serviceWorker';
import state, {addCard, updateCard} from "./state";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import App from "./App";

let rerenderTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode><App state={state} addCard={addCard} updateCard={updateCard}/></React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerenderTree(state)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
