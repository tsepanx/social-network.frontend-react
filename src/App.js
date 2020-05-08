import React, {Component} from 'react';
import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import Card from "./Card/Card";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";


const App = (props) => {

    const cards = props.state.cards.map((card, index) =>
        <Card
            key={index}
            id={index}
            title={card.title}
            task={card.description}
            state={ { isCompleted: card.completed } }>
        </Card>
    )

    return (
        <div className="App">
            <Header/>
            <Sidebar />
            <div className="App-content">
                <ul className="list-group list-group-flush"> {cards} </ul>
            </div>
        </div>
    );
}

export default App;