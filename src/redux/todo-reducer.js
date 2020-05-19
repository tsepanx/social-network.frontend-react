let todoAction = {
    ADD_TODO: 'ADD_TODO',
    UPDATE_TODO: 'UPDATE_TODO',
}

export const addTodoCreator = (item) => ({type: todoAction.ADD_TODO, item})
export const updateTodoCreator = (id, updatedState) => ({type: todoAction.UPDATE_TODO, id, updatedState})

let initialState = {
    items: [
        {text: 'Do something!', done: true},
        {text: 'Drink a coffee!', done: true},
    ]
}


const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case todoAction.ADD_TODO:
            return {
                ...state,
                items: [...state.items, action.item]
            }

        case todoAction.UPDATE_TODO:
            let copy = {...state, items: [...state.items,]}
            copy.items[action.id] = action.updatedState

            return copy
        default:
            return state;
    }
}

export const addTodo = (item) => (dispatch) => {
    dispatch(addTodoCreator(item));
}

export const updateTodo = (id, updatedState) => (dispatch) => {
    dispatch(updateTodoCreator(id, updatedState))
}

export default todoReducer