import {stopSubmit} from "redux-form";
import {AuthApi, UserApi} from "../api/api";
import {resetProfile} from "./profile-reducer";

const authActions = {
    SET_USER_CREDENTIALS: 'SET_USER_CREDENTIALS'
}

const setUserCredentials = (credentials, loaded, authorized) => ({
        type: authActions.SET_USER_CREDENTIALS,
        credentials,
        loaded,
        authorized
    }
)

let initialState = {
    loaded: false,
    authorized: false,

    credentials: {
        id: null,
        username: null,
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.SET_USER_CREDENTIALS:
            return {
                ...state,
                credentials: action.credentials,
                loaded: action.loaded,
                authorized: action.authorized
            }
        default:
            return state;
    }
}

export const setLoggedIn = (credentials) => (dispatch) => {
    dispatch(setUserCredentials(credentials, true, true))
}

export const setLoggedOut = () => (dispatch) => {
    dispatch(setUserCredentials(initialState.credentials, true, false))
}

export const submitLogin = ({username, password}) => async (dispatch) => {
    try {
        await AuthApi.authUser(username, password)
        await loginCurrentUser()(dispatch)
    } catch (e) {
        dispatch(stopSubmit('login', e))
    }
}

export const submitLogout = () => async (dispatch) => {
    await UserApi.logout()
    setLoggedOut()(dispatch)
    resetProfile()(dispatch)
}

export const submitSignUp = ({username, password}) => async (dispatch) => {
    try {
        await UserApi.createUser(username, password)
        let r = await loginCurrentUser()(dispatch)

        window.location.href = `/profile/${r.data.id}`
    } catch (e) {
        dispatch(stopSubmit('signup', e))
    }
}

export const loginCurrentUser = (refreshToken = false) => async (dispatch) => {
    let r = await AuthApi.getMe()
    setLoggedIn(r.data)(dispatch)

    if (refreshToken)
        await AuthApi.refreshToken()

    return r.data
}

export const submitChangeUsername = (id, username) => async (dispatch) => {
    try {
        await UserApi.changeUsername(id, username)
        await loginCurrentUser(true)(dispatch)

        // window.location.reload()
    } catch (e) {
        debugger
    }
}

export const submitChangePassword = (id, password) => async (dispatch) => {
    try {
        await UserApi.changePassword(id, password)
        await loginCurrentUser()(dispatch)

        window.location.reload()
    } catch (e) {
        let r = e.response
        debugger
    }
}


export default authReducer
