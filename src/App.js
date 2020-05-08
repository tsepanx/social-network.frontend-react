import React, {useState} from 'react';
import {Route, Router} from "react-router-dom";

import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Posts from './Posts/Posts'
import Messages from "./Messages/Messages";


const App = (props) => {

    console.log(useState())

    return (
        <div className="App">
            <Header/>
            <Sidebar/>

            <div className="App-content">
                <Route path='/posts' render={() => {
                    return <Posts state={props.state.posts} addCard={props.addCard} updateCard={props.updateCard}/>
                }}/>
                <Route path='/messages' render={() => {
                    return <Messages state={props.state}/>
                }}/>
            </div>
        </div>
    );
}

export default App;