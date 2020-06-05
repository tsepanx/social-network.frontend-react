const userAction = {
    SET_FRIENDS: 'SET_FRIENDS'
}

const setFriendsCreator = (friends) => ({
    type: userAction.SET_FRIENDS,
    friends
})

let initialState = {
    friends: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userAction.SET_FRIENDS:
            return {
                ...state,
                friends: action.friends
            }
        default:
            return state;
    }
}

export const setFriends = (friends) => (dispatch) => {
    dispatch(setFriendsCreator(friends))
}


export default userReducer
