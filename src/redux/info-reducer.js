import Api from "../api/api";

let itemAction = {
    SET_ITEMS: 'SET_INFO_ITEMS',
    ADD_ITEM: 'ADD_ITEM',
    UPDATE_NEW_ITEM_TEXT: 'UPDATE_NEW_ITEM_TEXT'
}

export const setInfoItemsCreator = (items) => ({type: itemAction.SET_ITEMS, items})
export const addInfoItemCreator = (itemData) => ({type: itemAction.ADD_ITEM, item: itemData})
export const updateNewItemTextCreator = (text) => ({type: itemAction.UPDATE_NEW_ITEM_TEXT, text: text})

export const reload = (countries) => (dispatch) => {
        dispatch(setInfoItemsCreator([]))

        for (const country of countries) {
            Api.receiveCountryData(country).then(data => {
                dispatch(addInfoItemCreator(data))
                console.log(data)
            })
        }
}

export const updateNewItemText = (text) => (dispatch) => {
    dispatch(updateNewItemTextCreator(text))
}



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
                items: [...state.items, action.item],
                newItemText: ''
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