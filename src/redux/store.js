import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

import cardsReducer from "./cards-reducer";
import infoReducer from "./info-reducer";

let reducers = combineReducers({
    cards: cardsReducer,
    info: infoReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store

export default store;