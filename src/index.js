import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Card from "./Card/Card";


let state = {
    cards: [{
        title: 'AAA',
        description: 'Do smdsfsdfdsfth...',
        completed: false
    }, {
        title: 'bbb',
        description: 'Do more!',
        completed: false
    }, {
        title: 'CCC',
        description: 'Do not do anything',
        completed: false
    }]
};


ReactDOM.render(
    <React.StrictMode><App state={state}/></React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
