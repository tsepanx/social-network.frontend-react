import React from "react";

// import s from './Card.module.css'

const Card = (props) => {
    let btn = React.createRef();
    let checkbox = React.createRef();

    const getBtnClasses = (isActive) => {
        const btnActiveClass = 'btn-success'

        let classes = "btn toggle-btn "
        if (isActive) { classes += btnActiveClass}

        return classes
    }

    const setCheckbox = (isActive) => {
        if (isActive) {
            checkbox.current.setAttribute('checked', '')
        } else {
            checkbox.current.removeAttribute('checked')
        }
    }

    const updateBtnStyle = () => {
        btn.current.classList.value = getBtnClasses(props.state.completed)
        setCheckbox(props.state.completed)
    }

    const handleClick = () => {
        props.state.completed = !props.state.completed

        props.updateCard(props.id, props.state)
        updateBtnStyle()
    }

    return (
        <div>
            <div className="card text-left" style={{width: '20rem'}}>
                <div className="card-header card-title">{props.state.title}</div>
                <div className="card-body">
                    <p className="card-text">{props.state.description}</p>
                    <hr/>
                    <div ref={btn} onClick={handleClick} className={getBtnClasses(props.state.completed)}>
                        Single toggle
                        <input ref={checkbox} className="toggle-checkbox"  type="checkbox"/>
                    </div>
                </div>
            </div>
            <p/>
        </div>
    )
}


export default Card;