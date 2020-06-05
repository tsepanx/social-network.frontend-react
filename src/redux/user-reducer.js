import {profileInitialState} from "./profile-reducer";

const userAction = {
    SET_FRIENDS: 'SET_FRIENDS'
}

const setFriendsCreator = (list) => ({
    type: userAction.SET_FRIENDS,
    list
})

let initialState = {
    profile: profileInitialState,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userAction.SET_FRIENDS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    friends: action.list
                }
            }
        default:
            return state;
    }
}

export const setFriends = (list) => (dispatch) => {
    dispatch(setFriendsCreator(list))
}


export default userReducer
