import {ProfileApi} from "../api/api";

const profileActions = {
    SET_PROFILE: 'SET_PROFILE',
    ADD_POST: 'ADD_POST'
}


export let profileInitialState = {
    loaded: false,
    id: null,

    profilePhoto: null,
    status: null,
    posts: [],

    friends: []
}


const addPostCreator = (post) => ({type: profileActions.ADD_POST, post})

const setProfileCreator = (profile, loaded) => ({type: profileActions.SET_PROFILE, profile: {...profile, loaded: loaded}})

const profileReducer = (state = profileInitialState, action) => {
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
    dispatch(setProfileCreator(profile, true))
}

export const resetProfile = (loaded) => (dispatch) => {
    dispatch(setProfileCreator(profileInitialState, loaded))
}

export const submitChangeStatus = (id, status) => async (dispatch) => {
    await ProfileApi.setStatus(id, status)

    setProfile({status})(dispatch)
}

export const submitChangePhoto = (id, url) => async (dispatch) => {
    await ProfileApi.setProfilePhoto(id, url)

    setProfile({profilePhoto: url})(dispatch)
}

export default profileReducer