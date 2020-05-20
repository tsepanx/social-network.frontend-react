const profileActions = {
    SET_USER: 'SET_USER',
    ADD_POST: 'ADD_POST',
    SET_STATUS: 'SET_STATUS'
}


let initialState = {
    profilePhoto: 'https://starwars-visualguide.com/assets/img/characters/2.jpg',
    status: 'Yo!!!',
    posts: [
        {
            title: 'Some another',
            text: 'Some another very long post text...Some another very long post text...Some another very long post text...Some another very long post text...'
        }
    ]
}


const setStatusCreator = (status) => ({type: profileActions.SET_STATUS, status})
const addPostCreator = (post) => ({type: profileActions.ADD_POST, post})

const setUserCreator = (user) => ({type: profileActions.SET_USER, user})

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
        default:
            return state;
    }
}

export const addPost = (post) => (dispatch) => {
    dispatch(addPostCreator(post))
}

export const setStatus = (status) => (dispatch) => {
    dispatch(setStatusCreator(status))
}

export const setUser = (user) => (dispatch) => {
    dispatch(setUserCreator(user))
}


export default profileReducer