import {AuthApi} from "../api/api";
import {submitLogout} from "./auth-reducer";

const profileActions = {
    SET_PROFILE: 'SET_PROFILE',
    ADD_POST: 'ADD_POST'
}


let initialState = {
    loaded: false,

    profilePhoto: null,
    status: null,
    posts: []
}


const addPostCreator = (post) => ({type: profileActions.ADD_POST, post})

const setProfileCreator = (profile) => ({type: profileActions.SET_PROFILE, profile: {...profile, loaded: true}})

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileActions.ADD_POST:
            return {
                ...state,
                posts: [action.post, ...state.posts]
            }
        case profileActions.SET_PROFILE:
            return {
                ...state,
                ...action.profile
            }
        default:
            return state;
    }
}

export const addPost = (post) => (dispatch) => {
    dispatch(addPostCreator(post))
}

export const setProfile = (profile) => (dispatch) => {
    dispatch(setProfileCreator(profile))
}

const obtainProfile = (id) => async (dispatch) => {
    let r = await AuthApi.getProfile(id)

    if (r.data) {
        setProfile({
            username: r.data.user.username,
            profilePhoto: r.data.profile_photo,
            status: r.data.status
        })(dispatch)
    } else {
        submitLogout()
    }
}

export default profileReducer