let cardAction = {
    ADD_CARD: 'ADD_CARD',
    UPDATE_CARD: 'UPDATE_CARD',
}

export const addCardCreator = () => ({type: cardAction.ADD_CARD})
export const updateCardCreator = (id, updatedState) => ({type: cardAction.UPDATE_CARD, id, updatedState})

let initialState = {
    items: [
        {label: 'Do more!', done: true},
    ]
}


const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case cardAction.ADD_CARD:
            let newCard = {label: 'New', done: false}

            return {
                ...state,
                items: [...state.items, newCard]
            }
        case cardAction.UPDATE_CARD:
            let copy = {...state, items: [...state.items,]}
            copy.items[action.id] = action.updatedState

            return copy
        default:
            return state;
    }
}

export default todoReducer