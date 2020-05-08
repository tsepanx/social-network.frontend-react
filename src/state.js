let store = {
    _state : {
        cards: {
            items: [
                {title: 'AAA', description: 'Do smdsfsdfdsfth...', completed: false},
                {title: 'bbb', description: 'Do more!', completed: false},
                {title: 'CCC', description: 'Do not do anything', completed: false}
            ]
        }
    },

    getState() { return this._state },

    addCard(newCard)  {
        this._state.cards.items.push(newCard)
    },


    updateCard(cardId, updatedCard) {
        this._state.cards.items[cardId] = updatedCard
    }
}


export default store
