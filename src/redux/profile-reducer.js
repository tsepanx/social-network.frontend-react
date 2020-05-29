import {AuthApi} from "../api/api";

const profileActions = {
    SET_PROFILE: 'SET_PROFILE',
    ADD_POST: 'ADD_POST',
    SET_STATUS: 'SET_STATUS'
}


let initialState = {
    username: '',
    profilePhoto: '',
    status: '',
    posts: [
        {
            title: 'Some another',
            text: 'Some another very long post text...Some another very long post text...Some another very long post text...Some another very long post text...'
        }
    ]
}


const addPostCreator = (post) => ({type: profileActions.ADD_POST, post})

const setProfileCreator = (profile) => ({type: profileActions.SET_PROFILE, profile})

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileActions.ADD_POST:
            return {
                ...state,
                posts: [action.post, ...state.posts]
            }
        case profileActions.SET_STATUS:
            return {
                ...state,
                status: action.status
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

export const obtainProfile = (id) => async (dispatch) => {
    let r = await AuthApi.getProfile(id)
    setProfile({
        username: r.data.user.username,
        profilePhoto: r.data.profile_photo,
        status: r.data.status
    })(dispatch)
}

export default profileReducer