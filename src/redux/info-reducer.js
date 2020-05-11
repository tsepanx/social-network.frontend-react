let itemAction = {
    SET_ITEMS: 'SET_INFO_ITEMS',
    ADD_ITEM: 'ADD_ITEM',
}

export const setInfoItemsCreator = (items) => ({type: itemAction.SET_ITEMS, items: items})
export const addInfoItemCreator = (item) => ({type: itemAction.ADD_ITEM, item})

let initialState = {
    items: []
}

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case itemAction.SET_ITEMS:
            return { items: action.items}
        case itemAction.ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.item]
            }
        default:
            return state;
    }
}

export default infoReducer