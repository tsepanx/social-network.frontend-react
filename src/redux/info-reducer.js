let cardAction = {
    SET_INFO_ITEMS: 'SET_INFO_ITEMS',
}

export const setInfoItemsCreator = (items) => ({type: cardAction.SET_INFO_ITEMS, items: items})

let initialState = {
    items: []
}

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case cardAction.SET_INFO_ITEMS:
            return { items: action.items}
        default:
            return state;
    }
}

export default infoReducer