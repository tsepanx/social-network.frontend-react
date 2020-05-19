import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

import todoReducer from "./todo-reducer";
import infoReducer from "./info-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    cards: todoReducer,
    info: infoReducer,
    auth: authReducer,

    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store

export default store;