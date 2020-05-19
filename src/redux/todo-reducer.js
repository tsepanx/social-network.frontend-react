let cardAction = {
    ADD_CARD: 'ADD_CARD',
    UPDATE_CARD: 'UPDATE_CARD',
}

export const addTodoCreator = (item) => ({type: cardAction.ADD_CARD, item})
export const updateTodoCreator = (id, updatedState) => ({type: cardAction.UPDATE_CARD, id, updatedState})

let initialState = {
    items: [
        {text: 'Do something!', done: true},
        {text: 'Repeat smth!', done: true},
    ]
}


const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case cardAction.ADD_CARD:
            return {
                ...state,
                items: [...state.items, action.item]
            }

        case cardAction.UPDATE_CARD:
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