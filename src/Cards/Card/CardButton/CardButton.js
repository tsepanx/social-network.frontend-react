import React, {useState} from "react";

import s from './CardButton.module.css'

const CardButton = (props) => {
    let btn = React.createRef();
    let checkbox = React.createRef();

    const getBtnClass = () => s.btn + ' btn ' + (props.state.isActive ? 'btn-success' : '')

    const [isChecked, setCheckbox] = useState(props.state.isActive)
    const [btnClass, setBtnClass] = useState(getBtnClass())

    const updateBtn = () => {
        setBtnClass(getBtnClass)
        setCheckbox(props.state.isActive)
    }

    const handleClick = () => {
        props.state.isActive = !props.state.isActive

        props.updateIsCompleted(props.state.isActive)
        updateBtn()
    }

    return (
        <div ref={btn}
             onClick={handleClick}
             className={btnClass}>
            <div className={s.btnText}>Single toggle</div>
            <input ref={checkbox} className="toggle-checkbox" type="checkbox" readOnly={true} checked={isChecked}/>
        </div>
    )
}

export default CardButton