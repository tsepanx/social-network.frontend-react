let itemAction = {
    SET_ITEMS: 'SET_INFO_ITEMS',
    ADD_ITEM: 'ADD_ITEM',
    UPDATE_NEW_ITEM_TEXT: 'UPDATE_NEW_ITEM_TEXT'
}

export const setInfoItemsCreator = (items) => ({type: itemAction.SET_ITEMS, items})
export const addInfoItemCreator = (item) => ({type: itemAction.ADD_ITEM, item})
export const updateNewItemTextCreator = (text) => ({type: itemAction.UPDATE_NEW_ITEM_TEXT, text})

let initialState = {
    items: [],
    newItemText: ''
}

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case itemAction.SET_ITEMS:
            return {
                ...state,
                items: action.items
            }
        case itemAction.ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.item]
            }
        case itemAction.UPDATE_NEW_ITEM_TEXT:
            return {
                ...state,
                newItemText: action.text
            }
        default:
            return state;
    }
}

export default infoReducer