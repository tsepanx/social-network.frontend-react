import React from "react";
import './item.css'

const Item = (props) => {

    const handleClick = () => {
        props.state.done = !props.state.done
        props.updateCard(props.id, props.state)
    }

    return (
        <li className='item list-group-item'>
            {props.state.label}
            <div
                onClick={handleClick}
                className={`btn ${props.state.done ? 'btn-info' : ''}`}>

                <div>Single toggle</div>
                <input
                    className="toggle-checkbox"
                    type="checkbox"
                    readOnly={true}
                    checked={props.state.done}/>
            </div>
        </li>
    )
}


export default Item;