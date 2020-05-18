import React, {useState} from 'react';
import {Route, Router} from "react-router-dom";

import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import Header from "./../header/Header";
import Sidebar from "./../sidebar/Sidebar";

import {contentComponents} from "../sidebar/Sidebar";

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