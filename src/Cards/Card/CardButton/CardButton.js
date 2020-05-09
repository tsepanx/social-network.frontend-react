import React, {useState} from "react";

const CardButton = (props) => {
    let btn = React.createRef();
    let checkbox = React.createRef();

    const [isChecked, setCheckbox] = useState(props.state.isActive)

    const getBtnClasses = () => props.state.isActive ? 'btn toggle-btn btn-success' : 'btn toggle-btn'

    const updateBtn = () => {
        btn.current.classList.value = getBtnClasses(props.state.isActive)
        setCheckbox(props.state.isActive)
    }

    const handleClick = () => {
        props.state.isActive = !props.state.isActive
        props.updateIsCompleted(props.state.isActive)
        updateBtn()
    }

    return (
        <div ref={btn} onClick={handleClick} className={getBtnClasses()}>
            Single toggle
            <input ref={checkbox} className="toggle-checkbox" type="checkbox" readOnly={true} checked={isChecked}/>
        </div>
    )
}

export default CardButton