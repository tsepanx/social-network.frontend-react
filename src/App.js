import React, {Component} from 'react';
import './App.css';

import "bootstrap/dist/css/bootstrap.css";

import Card from "./Card";
import Header from "./Header";


const App = (props) => {

    const cards = props.state.cards.map((card, index) =>
        <Card
            key={index}
            id={index}
            name={card.title}
            task={card.description}
            isCompleted={card.completed}>
        </Card>
    )

    return (
        <div className="App">
            <Header/>
            <div className="App-header">
                <ul className="list-group list-group-flush"> {cards} </ul>
            </div>
        </div>
    );
}

export default App;