import React from "react";
import './todo-list.css'

import Item from "./item/item";
import {compose} from "redux";
import {connect} from "react-redux";
import {addTodo, updateTodo} from "../../redux/todo-reducer";
import {withAuthRedirect} from "../hoc/with-auth-redirect";

const TodoList = (props) => {

    const todoItems = props.items.map((todoItem, index) =>
        <Item
            key={index}
            id={index}
            updateTodo={props.updateTodo}
            state={todoItem}>
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
    // withAuthRedirect,
)(TodoList);