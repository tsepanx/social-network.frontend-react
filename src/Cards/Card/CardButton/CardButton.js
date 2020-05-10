import React, {useState} from "react";

import s from './CardButton.module.css'

const CardButton = (props) => {
    let btn = React.createRef();
    let checkbox = React.createRef();

    const getBtnClass = () => `${s.btn} btn ${props.state.isActive ? 'btn-success' : ''}`

    const handleClick = () => { props.updateIsCompleted(!props.state.isActive) }

    return (
        <div ref={btn}
             onClick={handleClick}
             className={getBtnClass()}>
            <div className={s.btnText}>Single toggle</div>
            <input ref={checkbox} className="toggle-checkbox" type="checkbox" readOnly={true} checked={props.state.isActive}/>
        </div>
    )
}

export default CardButton