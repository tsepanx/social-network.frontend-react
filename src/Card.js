import React, {Component} from "react";
import $ from "jquery";

import s from './Card.module.css'

//
// let state = {
//     isCompleted: args.isCompleted
// }

// handleClick = handleClick.bind(this)

const Card = (props) => {
    const toggleButtonStyle = () => {
        const btn = $(document.getElementById(`toggleBtn${props.id}`))

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

    const handleClick = () => {
        toggleButtonStyle()
        props.state.isCompleted = !props.state.isCompleted
        console.log(props.state.isCompleted)
    }

    return (
        <div>
            <div className="card text-left" style={{width: '20rem'}}>
                <div className="card-header card-title">{props.title}</div>
                <div className="card-body">
                    <p className="card-text">{props.task}</p>
                    <hr/>
                    <div id={`toggleBtn${props.id}`}
                         onClick={handleClick}
                         className="btn toggle-btn">

                        Single toggle <input className="toggle-checkbox" readOnly={false} type="checkbox"
                                             checked={props.state.isCompleted}/>
                    </div>
                </div>
            </div>
            <p/>
        </div>
    )
}


export default Card;