import React from "react";
import {connect} from "react-redux";
import TodoList from "./todo-list";
import {addCardCreator, updateCardCreator} from "../../redux/todo-reducer";


let mapStateToProps = (state) => {
    return {
        items: state.cards.items,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addCard: () => {
            dispatch(addCardCreator());
        },
        updateCard: (id, updatedState) => {
            dispatch(updateCardCreator(id, updatedState))
        }
    }
}

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListContainer;