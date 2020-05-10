import React from "react";
import s from './Card.module.css'

const Card = (props) => {
    let completedButton = React.createRef();
    let completedCheckbox = React.createRef();

    const updateIsCompleted = (isCompleted) => {
        props.state.isCompleted = isCompleted
        props.updateCard(props.id, props.state)
    }

    const handleClick = () => { updateIsCompleted(!props.state.isCompleted) }

    return (
        <div>
            <div className="card text-left" style={{width: '20rem'}}>
                <div className="card-header card-title">{props.state.title}</div>

                <div className="card-body">
                    <p className="card-text">{props.state.description}</p>
                    <hr/>

                    <div ref={completedButton}
                         onClick={handleClick}
                         className={`${s.btn} btn ${props.state.isCompleted ? 'btn-success' : ''}`}>
                        <div className={s.btnText}>Single toggle</div>
                        <input ref={completedCheckbox}
                               className="toggle-checkbox"
                               type="checkbox"
                               readOnly={true}
                               checked={props.state.isCompleted}/>
                    </div>
                </div>
            </div>
            <p/>
        </div>
    )
}


export default Card;