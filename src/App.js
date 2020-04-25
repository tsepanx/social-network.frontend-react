import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";

import $ from 'jquery'

class TodoItem extends Component {
    constructor(args) {
        super(args);

        this.id = args.id
        this.title = args.name
        this.task = args.task

        this.state = {
            isCompleted: args.isCompleted
        }

        this.toggleButtonId =  `toggleBtn${this.id}`

        this.handleClick = this.handleClick.bind(this)
    }

    toggleButtonStyle() {
        const btn = $(document.getElementById(this.toggleButtonId))

        const classActive = 'btn-success'
        const classDisabled = ''

        if (btn.hasClass(classActive)) {
            btn.removeClass(classActive)
            btn.addClass(classDisabled)
        } else {
            btn.removeClass(classDisabled)
            btn.addClass(classActive)
        }
    }

    handleClick() {
        this.toggleButtonStyle()
        this.setState({ isCompleted: !this.state.isCompleted })
    }

    render() {
        return (
            <div>
                <div className="card text-left"  style={{ width: '20rem'}}>
                    <div className="card-header card-title">{this.title}</div>
                    <div className="card-body">
                        <p className="card-text">{this.task}</p>
                        <hr/>
                        <div id={this.toggleButtonId} onClick={this.handleClick} className="btn toggle-btn">
                            Single toggle <input className="toggle-checkbox" readOnly={true} type="checkbox" checked={this.state.isCompleted} />
                        </div>
                    </div>
                </div>
                <p/>
            </div>

        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.textId = 'textId'
        this.logoId = 'logo'

        this.state = {
            cards: [ {
                title: 'AAA',
                description: 'Do smth...',
                completed: false
            }, {
                title: 'bbb',
                description: 'Do more!',
                completed: false
            }, {
                title: 'CCC',
                description: 'Do not do anything',
                completed: false
            } ]
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // const newInput = event.target.value;
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
                        <ul className="list-group list-group-flush">
                            {this.state.cards.map((card, index) => {
                                return <TodoItem
                                    key={index}
                                    id={index}
                                    name={card.title}
                                    task={card.description}
                                    isCompleted={card.completed}>
                                </TodoItem>
                            })}
                        </ul>
                </div>
            </div>
        );
    }
}

export default App;