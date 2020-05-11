import {combineReducers, createStore} from "redux";
import cardsReducer from "./cards-reducer";
import infoReducer from "./info-reducer";

let reducers = combineReducers({
    cards: cardsReducer,
    info: infoReducer
});

let store = createStore(reducers);
window.store = store

export default store;