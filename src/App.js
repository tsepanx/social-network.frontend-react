import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import $ from 'jquery'

function TodoItem(args) {
    return <li><input type="checkbox" checked={args.isCompleted} />{args.children}</li>
}

class App extends Component {
    constructor(props) {
        super(props);

        this.textId = 'textId'
        this.logoId = 'logo'

        this.state = {
            cards: [ {
                name: 'AAA',
                task: 'Do smth...',
                completed: false
            }, {
                name: 'bbb',
                task: 'Do more!',
                completed: false
            }, {
                name: 'CCC',
                task: 'Do not do anything',
                completed: false
            } ]
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const newInput = event.target.value;

        const mainText = $(document.getElementById(this.textId))
        mainText.text(this.textToShow(newInput))
    }

    render() {
        return (
            <div className="App">
                <div className="Header">
                    <input
                        type="text"
                        placeholder="Command name"
                        onChange={this.handleChange}
                    />

                    <p id={this.textId}>Write your command</p>

                </div>
                <div className="App-header">
                    <img className="App-logo" id={this.logoId} src={logo} alt="logo" />
                    <ul>
                        {this.state.cards.map((card, index) => {
                            return <TodoItem
                                key={index}
                                isCompleted={card.completed}>
                                {card.task}
                            </TodoItem>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;