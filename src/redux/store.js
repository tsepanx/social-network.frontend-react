import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleware from "redux-thunk";

import cardsReducer from "./cards-reducer";
import infoReducer from "./info-reducer";

let reducers = combineReducers({
    cards: cardsReducer,
    info: infoReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store

export default store;