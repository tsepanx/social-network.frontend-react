export let cardAction = {
    ADD_CARD: 'ADD_CARD',
    UPDATE_CARD: 'UPDATE_CARD',
    // COMPLETED: 'COMPLETED'
}

let initialState = {
    items: [
        {title: 'AAA', description: 'Do smdsfsdfdsfth...', isCompleted: false},
        // {title: 'bbb', description: 'Do more!', isCompleted: false},
        // {title: 'CCC', description: 'Do not do anything', isCompleted: false}
    ]
}


const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case cardAction.ADD_CARD:
            let newCard = {
                title: 'New Title',
                description: 'New',
                isCompleted: false
            }

            state.items.push(newCard);

            return state;
        case cardAction.UPDATE_CARD:
            let cardId = action.id
            let newCardState = action.updatedState

            state.items[cardId] = newCardState

            return state;
        // case cardAction.COMPLETED:

        default:
            return state;
    }
}

export default cardsReducer