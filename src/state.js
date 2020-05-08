import cardsReducer from "./reducers/cards-reducer";

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

    dispatch(action) {
        // debugger
        this._state.cards = cardsReducer(this._state.cards, action)

        this._callSubscriber(this._state)
    }
}

window.store = store
export default store
