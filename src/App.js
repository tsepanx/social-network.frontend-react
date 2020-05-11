import React from 'react';
import {Route, Router} from "react-router-dom";

import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

import {contentComponents} from "./Sidebar/Sidebar";

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
            <Sidebar/>

            <div className="App-content">{routeItems}</div>
        </div>
    );
}

export default App;