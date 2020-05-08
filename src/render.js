import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import App from "./App";

import {addCard, updateCard} from './state'

let rerenderTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode><App state={state} addCard={addCard} updateCard={updateCard}/></React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

export default rerenderTree