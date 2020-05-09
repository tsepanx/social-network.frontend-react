import React, {useEffect, useState} from "react";

import {typeEnum} from "../../redux/cards-reducer";
// import s from './Card.module.css'

const Card = (props) => {
    let btn = React.createRef();
    let checkbox = React.createRef();

    const [isChecked, setCheckbox] = useState(props.state.isCompleted)

    const getBtnClasses = (isActive) => {
        const btnActiveClass = 'btn-success'

        let classes = "btn toggle-btn "
        if (isActive) { classes += btnActiveClass}

        return classes
    }

    const updateBtnStyle = () => {
        btn.current.classList.value = getBtnClasses(props.state.isCompleted)
        setCheckbox(props.state.isCompleted)
    }

    const handleClick = () => {
        props.state.isCompleted = !props.state.isCompleted

        props.dispatch({type: typeEnum.UPDATE_CARD, id: props.id, updatedState: props.state})
        // props.updateCard(props.id, props.state)
        updateBtnStyle()
    }

    useEffect(() => {
        console.log('Component did mount!!! ' + isChecked)
    }, [isChecked])

    return (
        <div>
            <div className="card text-left" style={{width: '20rem'}}>
                <div className="card-header card-title">{props.state.title}</div>
                <div className="card-body">
                    <p className="card-text">{props.state.description}</p>
                    <hr/>
                    <div ref={btn} onClick={handleClick} className={getBtnClasses(props.state.isCompleted)}>
                        Single toggle
                        <input ref={checkbox} className="toggle-checkbox" type="checkbox" readOnly={true} checked={isChecked}/>
                    </div>
                </div>
            </div>
            <p/>
        </div>
    )
}


export default Card;