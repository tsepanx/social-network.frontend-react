import {combineReducers, createStore} from "redux";
import cardsReducer from "./cards-reducer";

let reducers = combineReducers({
    cards: cardsReducer
});

let store = createStore(reducers);

window.store = store

export default store;