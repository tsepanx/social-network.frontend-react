import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

import todoReducer from "./todo-reducer";
import infoReducer from "./info-reducer";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import friendsReducer from "./friends-reducer";

let reducers = combineReducers({
    todo: todoReducer,
    info: infoReducer,
    auth: authReducer,
    profile: profileReducer,
    friends: friendsReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store

export default store;