import {stopSubmit} from "redux-form";
import {CountryApi} from "../api/other";

let infoAction = {
    SET_ITEMS: 'SET_INFO_ITEMS',
    ADD_ITEM: 'ADD_ITEM',
    TOGGLE_FETCHING: 'TOGGLE_FETCHING'
}

export const setInfoItemsCreator = (items) => ({type: infoAction.SET_ITEMS, items})
export const addInfoItemCreator = (itemData) => ({type: infoAction.ADD_ITEM, item: itemData})
export const toggleFetching = (isFetching) => ({type: infoAction.TOGGLE_FETCHING, fetching: isFetching})

export const reload = (countries) => async (dispatch) => {
    dispatch(setInfoItemsCreator([]))
    dispatch(toggleFetching(true))

    let resData = []

    for (const country of countries) {
        try {
            let data = await CountryApi.receiveCountryData(country)
            resData.push(data)
        } catch (e) {
            let fakeData = {error: 'Error: ' + e.response.status + ' for country: ' + country}
            resData.push(fakeData)
        }
    }

    resData.forEach(value => {
        dispatch(addInfoItemCreator(value))
    })
    dispatch(toggleFetching(false))
}

export const validateCountry = (name, addNewCountry) => async (dispatch) => {
    try {
        let data = await CountryApi.receiveCountryData(name)
        addNewCountry(data.country)
    } catch (e) {
        dispatch(stopSubmit('new', {name: 'Unknown country'}))
    }
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
            return {
                ...state,
                items: [...state.items, action.item],
            }
        case infoAction.TOGGLE_FETCHING:
            return {
                ...state,
                fetching: action.fetching
            }
        default:
            return state;
    }
}

export default infoReducer