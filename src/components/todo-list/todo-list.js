import React from "react";
import './todo-list.css'

import Item from "./item/item";
import {compose} from "redux";
import {connect} from "react-redux";
import {addTodo, updateTodo} from "../../redux/todo-reducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

const TodoList = (props) => {

    const todoItems = props.items.map((cardItem, index) =>
        <Item
            key={index}
            id={index}
            updateCard={props.updateTodo}
            state={cardItem}>
        </Item>
    )

    const onAddNew = () => {
        props.addTodo({text: 'New Item'})
    }

    return (
        <div className='todo-list'>
            <div onClick={onAddNew} className={'btn btn-success ' + 'btn-new'}>Add New</div>

            <ul className="list-group">
                {todoItems}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({...state.todo})

export default compose(
    connect(mapStateToProps, {addTodo, updateTodo}),
    withAuthRedirect,
)(TodoList);