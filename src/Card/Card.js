import React from "react";

// import s from './Card.module.css'

const Card = (props) => {
    const toggleButtonStyle = () => {
        const btn = document.getElementsByClassName('btn').item(props.id)

        const classActive = 'btn-success'
        if (btn.classList.contains(classActive)) {
            btn.classList.remove(classActive)
        } else {
            btn.classList.add(classActive)
        }
    }

    const handleClick = () => {
        toggleButtonStyle()
        props.state.isCompleted = !props.state.isCompleted

        const toggle = document.getElementsByClassName('toggle-checkbox').item(props.id)
        if (props.state.isCompleted) {
            toggle.setAttribute('checked', '')
        } else {
            toggle.removeAttribute('checked')
        }
        // toggle.setAttribute('checked', props.state.isCompleted)

        console.log(toggle.attributes)
    }

    return (
        <div>
            <div className="card text-left" style={{width: '20rem'}}>
                <div className="card-header card-title">{props.title}</div>
                <div className="card-body">
                    <p className="card-text">{props.task}</p>
                    <hr/>
                    <div onClick={handleClick} className="btn toggle-btn">
                        Single toggle
                        <input className="toggle-checkbox" readOnly={false} type="checkbox"/>
                    </div>
                </div>
            </div>
            <p/>
        </div>
    )
}


export default Card;