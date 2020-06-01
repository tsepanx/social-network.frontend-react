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

const setProfileCreator = (profile, loaded) => ({type: profileActions.SET_PROFILE, profile: {...profile, loaded: loaded}})

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
    // if (Object.keys(post).length !== 0) {
        dispatch(addPostCreator(post))
    // }
}

export const setProfile = (profile) => (dispatch) => {
    dispatch(setProfileCreator(profile, true))
}

export const resetProfile = () => (dispatch) => {
    dispatch(setProfileCreator(initialState, false))
}

// export const submitNewPost = (post) =>

export default profileReducer