export let typeEnum = {
    ADD_CARD: 'ADD_CARD',
    UPDATE_CARD: 'UPDATE_CARD'
}

let store = {
    _state: {
        cards: {
            items: [
                {title: 'AAA', description: 'Do smdsfsdfdsfth...', completed: false},
                // {title: 'bbb', description: 'Do more!', completed: false},
                // {title: 'CCC', description: 'Do not do anything', completed: false}
            ]
        }
    },

    _callSubscriber() {
        console.log('Subscriber called')
    },

    subscribe(observer) {
        this._callSubscriber = observer
    },

    getState() {
        return this._state
    },

    addCard(newCard) {
        this._state.cards.items.push(newCard);
    },

    updateCard(cardId, updatedState) {
        this._state.cards.items[cardId] = updatedState
    },

    dispatch(action) {
        // debugger
        if (action.type === typeEnum.ADD_CARD) {
            let newCard = {
                title: 'New Title',
                description: 'New',
                completed: true
            }

            this.addCard(newCard)
        } else if (action.type === typeEnum.UPDATE_CARD) {
            this.updateCard(action.id, action.updatedState)
        }

        this._callSubscriber(this._state)
    }
}

window.store = store
export default store
