import React from "react";
import './todo-list.css'

import Item from "./item/item";

const TodoList = (props) => {

    const cards = props.items.map((cardItem, index) =>
        <Item
            key={index}
            id={index}
            updateCard={props.updateCard}
            state={cardItem}>
        </Item>
    )

    return (
        <div className='todo-list'>
            <div onClick={props.addCard} className={'btn btn-success ' + 'btn-new'}>Add New</div>

            <ul className="list-group">
                {cards}
            </ul>
        </div>
    )
}

export default TodoList