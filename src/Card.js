import React, {Component} from "react";
import $ from "jquery";

import s from './Card.module.css'


class Card extends Component {
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


export default Card;