import {stopSubmit} from "redux-form";
import {AuthApi, UserApi} from "../api/api";
import {resetProfile} from "./profile-reducer";

const authActions = {
    SET_USER_CREDENTIALS: 'SET_USER_CREDENTIALS'
}

const setUserCredentials = (credentials, authorized) => ({
        type: authActions.SET_USER_CREDENTIALS,
        credentials,
        authorized
    }
)

let initialState = {
    credentials: {
        id: null,
        username: null,
    },
    authorized: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.SET_USER_CREDENTIALS:
            return {
                ...state,
                credentials: action.credentials,
                authorized: action.authorized
            }
        default:
            return state;
    }
}

export const setLoggedIn = (credentials) => (dispatch) => {
    dispatch(setUserCredentials(credentials, true))
}

const setLoggedOut = () => (dispatch) => {
    dispatch(setUserCredentials(initialState.credentials, false))
}

export const submitLogin = ({username, password}) => async (dispatch) => {
    let response = await AuthApi.authUser(username, password)
    const isAuthorized = response !== false

    if (isAuthorized) {
        setLoggedIn(response)(dispatch)
    } else {
        dispatch(stopSubmit('login', {password: 'wrong password or username'}))
    }
}

export const authCurrentUser = () => async (dispatch) => {
    let response = await AuthApi.getMe()
    let success = response !== false

    if (success) {
        await AuthApi.refreshToken()
        setLoggedIn({...response.data})(dispatch)
    }
}

export const submitLogout = () => async (dispatch) => {
    const response = await UserApi.logout()
    let success = response === true

    if (success) {
        setLoggedOut()(dispatch)
        resetProfile()(dispatch)
    } else {
        console.log('Error while logging out')
    }
}

export default authReducer