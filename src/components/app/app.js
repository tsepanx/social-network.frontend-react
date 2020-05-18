import React from 'react';
import {Route, Router} from "react-router-dom";

import "bootswatch/dist/darkly/bootstrap.min.css"

import './app.css';

import Header from "../header/header";

import {contentComponents} from "../header/header";

const App = () => {

    let routeItems = contentComponents.map((value, index) =>
        <Route
            key={index}
            path={value.path}
            render={() => value.component}
        />)

    return (
        <div className="App">
            <Header/>

            <div className="App-content">{routeItems}</div>
        </div>
    );
}

export default App;