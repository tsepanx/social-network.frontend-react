import React, {useState} from 'react';
import {Route, Router} from "react-router-dom";

import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Cards from './Cards/Cards'
import Messages from "./Messages/Messages";
import CardsContainer from "./Cards/CardsContainer";


const App = () => {
    return (
        <div className="App">
            <Header/>
            <Sidebar/>

            <div className="App-content">
                <Route path='/posts' render={() => {
                    return <CardsContainer
                        // state={props.state.cards}
                        // dispatch={props.dispatch}
                    />
                }}/>
                <Route path='/messages' render={() => {
                    return <Messages
                        // state={props.state}
                    />
                }}/>
            </div>
        </div>
    );
}

export default App;