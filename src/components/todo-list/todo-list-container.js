import React from "react";
import {connect} from "react-redux";
import TodoList from "./todo-list";
import {addCardCreator, updateCardCreator} from "../../redux/todo-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";


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

const TodoListContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(TodoList);

export default TodoListContainer;