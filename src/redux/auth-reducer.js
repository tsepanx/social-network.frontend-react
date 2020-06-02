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
    try {
        await AuthApi.authUser(username, password)
        await authCurrentUser(true)(dispatch)
        // setLoggedIn(response)(dispatch)
    } catch (e) {
        dispatch(stopSubmit('login', e))
    }
}

export const submitSignUp = ({username, password}) => async (dispatch) => {
    try {
        await UserApi.createUser(username, password)
        let id = await authCurrentUser(false)(dispatch)

        window.location.href = `/profile/${id}`
    } catch (e) {
        dispatch(stopSubmit('signup', e))
    }
}

export const authCurrentUser = (refreshToken = false) => async (dispatch) => {
    try {
        let r = await AuthApi.getMe()
        setLoggedIn(r.data)(dispatch)

        if (refreshToken)
            await AuthApi.refreshToken()

        return r.data.id
    } catch (e) {
        console.log(e)
    }
}

export const submitLogout = () => async (dispatch) => {
    try {
        await UserApi.logout()
        setLoggedOut()(dispatch)
        resetProfile()(dispatch)
    } catch (e) {
        console.log('Error while logging out')
    }
}

export default authReducer