export let typeEnum = {
    ADD_CARD: 'ADD_CARD',
    UPDATE_CARD: 'UPDATE_CARD'
}

let initialState = {
    items: [
        {title: 'AAA', description: 'Do smdsfsdfdsfth...', completed: false},
        // {title: 'bbb', description: 'Do more!', completed: false},
        // {title: 'CCC', description: 'Do not do anything', completed: false}
    ]
}


const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case typeEnum.ADD_CARD:
            let newCard = {
                title: 'New Title',
                description: 'New',
                completed: false
            }

            state.items.push(newCard);

            return state;
        case typeEnum.UPDATE_CARD:
            let cardId = action.id
            let newCardState = action.updatedState

            state.items[cardId] = newCardState

            return state;
        default:
            return state;
    }
}

export default cardsReducer