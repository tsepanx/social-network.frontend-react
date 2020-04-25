import React, { Component } from 'react';
import logo from './logo.svg';
import first from './first.png'
import second from './second.png'
import './App.css';

import $ from 'jquery'

class App extends Component {
    constructor(props) {
        super(props);

        this.textId = 'textId'
        this.logoId = 'logo'

        this.state = {
            userInput: ''
        };

        this.defaultLogo = logo
        this.commands = {
            aa: first,
            bb: second
        }

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
    }

    textToShow(inputText) {
        const logo = $(document.getElementById(this.logoId))

        if (inputText in this.commands) {
            logo.attr("src", this.commands[inputText])
            return 'Yes, i know!'
        } else {
            logo.attr("src", this.defaultLogo)
            return `${inputText}? Never heard of them?`
        }
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

                    <p id={this.textId}>

                    </p>

                </div>
                <div className="App-header">
                    <img id={this.logoId} src={logo} alt="logo" />
                    <h2>Welcome to My TODO List</h2>
                </div>
            </div>
        );
    }
}

export default App;