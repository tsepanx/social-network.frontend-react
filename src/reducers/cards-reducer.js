export let typeEnum = {
    ADD_CARD: 'ADD_CARD',
    UPDATE_CARD: 'UPDATE_CARD'
}


const cardsReducer = (cardsState, action) => {
    switch (action.type) {
        case typeEnum.ADD_CARD:
            let newCard = {
                title: 'New Title',
                description: 'New',
                completed: false
            }

            cardsState.items.push(newCard);

            return cardsState;
        case typeEnum.UPDATE_CARD:
            let cardId = action.id
            let newCardState = action.updatedState

            cardsState.items[cardId] = newCardState

            return cardsState;
        default:
            return cardsState;
    }
}

export default cardsReducer