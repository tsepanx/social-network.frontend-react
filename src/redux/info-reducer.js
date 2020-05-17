import Api from "../api/api";
import {stopSubmit} from "redux-form";

let itemAction = {
    SET_ITEMS: 'SET_INFO_ITEMS',
    ADD_ITEM: 'ADD_ITEM'
}

export const setInfoItemsCreator = (items) => ({type: itemAction.SET_ITEMS, items})
export const addInfoItemCreator = (itemData) => ({type: itemAction.ADD_ITEM, item: itemData})

export const reload = (countries) => (dispatch) => {
    dispatch(setInfoItemsCreator([]))

    for (const country of countries) {
        Api.receiveCountryData(country)
            .then(data => {
                dispatch(addInfoItemCreator(data))
                console.log(data)
            })
            .catch(error => {
                let fakeData = {error: 'Error: ' + error.response.status + ' for country: ' + country}
                dispatch(addInfoItemCreator(fakeData))
            })
    }
}

export const validateCountry = (name, addNewCountry) => (dispatch) => {

    Api.receiveCountryData(name)
        .then( data => {
            addNewCountry(data.country)
        })
        .catch(error =>
            dispatch(stopSubmit('newItem', {name: 'Unknown country'}))
        )
}


let initialState = {
    items: []
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
            }
        default:
            return state;
    }
}

export default infoReducer