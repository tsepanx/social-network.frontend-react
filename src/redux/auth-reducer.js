import {stopSubmit} from "redux-form";
import {AuthApi} from "../api/api";

const authActions = {
    SET_USER_CREDENTIALS: 'SET_USER_CREDENTIALS',
}

const setUserCredentials = (username, authorized) => ({
        type: authActions.SET_USER_CREDENTIALS,
        credentials: {username},
        authorized
    }
)

let initialState = {
    credentials: {
        // id: null,
        username: null,
    },
    authorized: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.SET_USER_CREDENTIALS:
            return {
                ...state,
                credentials: action.credentials,
                authorized: true
            }
        default:
            return state;
    }
}

export const submitLogin = ({username, password}) => async (dispatch) => {
    const response = await AuthApi.authUser(username, password)
    let isAuthorized = response.data === true

    if (isAuthorized) {
        dispatch(setUserCredentials(username, true))
    } else {
        dispatch(stopSubmit('login', {password: 'Wrong password or username'}))
    }
}

export const submitLogout = () => async (dispatch) => {
    const response = await AuthApi.logout()
    let success = response.data === true

    if (success) {
        dispatch(setUserCredentials(null, false))
    } else {
        console.log('couldnt logout')
    }
}

export default authReducer