import React from "react";
import './item.css'

const Item = ({state, id, updateTodo}) => {

    const handleClick = () => {
        state.done = !state.done
        updateTodo(id, state)
    }

    return (
        <li className='item list-group-item'>
            {state.text}
            <div
                onClick={handleClick}
                className={`btn ${state.done ? 'btn-info' : ''}`}>

                <div>Single toggle</div>
                <input
                    className="toggle-checkbox"
                    type="checkbox"
                    readOnly={true}
                    checked={state.done}/>
            </div>
        </li>
    )
}


export default Item;