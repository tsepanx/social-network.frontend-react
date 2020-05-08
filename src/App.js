import React from 'react';
import {BrowserRouter, NavLink, Route, Router} from "react-router-dom";

import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Posts from './Posts/Posts'
import Messages from "./Messages/Messages";
// import Router from "react-router-dom/es/Router";
// import Route from "react-router-dom/es/Route";


const App = (props) => {
    return (
        <div className="App">
            <Header/>
            <Sidebar/>

            <div className="App-content">
                <Route path='/posts' render={() => {
                    return <Posts state={props.state.posts}/>
                }}/>
                <Route path='/messages' render={() => {
                    return <Messages state={props.state}/>
                }}/>
            </div>
        </div>
    );
}

export default App;