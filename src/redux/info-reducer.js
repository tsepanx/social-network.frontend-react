import Api from "../api/api";
import {stopSubmit} from "redux-form";

let infoAction = {
    SET_ITEMS: 'SET_INFO_ITEMS',
    ADD_ITEM: 'ADD_ITEM',
    TOGGLE_FETCHING: 'TOGGLE_FETCHING'
}

export const setInfoItemsCreator = (items) => ({type: infoAction.SET_ITEMS, items})
export const addInfoItemCreator = (itemData) => ({type: infoAction.ADD_ITEM, item: itemData})
export const toggleFetching = (isFetching) => {
    let a = {type: infoAction.TOGGLE_FETCHING, fetching: isFetching}
    console.log(a)
    return a
}

export const reload = (countries) => async (dispatch) => {
    dispatch(setInfoItemsCreator([]))
    dispatch(toggleFetching(true))

    let resData = []

    for (const country of countries) {
        try {
            let data = await Api.receiveCountryData(country)
            resData.push(data)
        } catch (e) {
            let fakeData = {error: 'Error: ' + e.response.status + ' for country: ' + country}
            resData.push(fakeData)
        }
    }

    resData.forEach(value => {dispatch(addInfoItemCreator(value))})
    dispatch(toggleFetching(false))
}

export const validateCountry = (name, addNewCountry) => (dispatch) => {

    Api.receiveCountryData(name)
        .then(data => {
            addNewCountry(data.country)
        })
        .catch(error =>
            dispatch(stopSubmit('newItem', {name: 'Unknown country'}))
        )
}


let initialState = {
    items: [],
    fetching: false
}

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case infoAction.SET_ITEMS:
            return {
                ...state,
                items: action.items
            }
        case infoAction.ADD_ITEM:
            console.log(state.fetching)
            return {
                ...state,
                items: [...state.items, action.item],
            }
        case infoAction.TOGGLE_FETCHING:
            console.log(1)
            return {
                ...state,
                fetching: action.fetching
            }
        default:
            return state;
    }
}

export default infoReducer