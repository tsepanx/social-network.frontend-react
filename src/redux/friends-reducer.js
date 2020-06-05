const friendsAction = {
    SET_FRIENDS: 'SET_FRIENDS'
}

const setFriendsCreator = (list) => ({
    type: friendsAction.SET_FRIENDS,
    list
})

let initialState = {
    list: []
}

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case friendsAction.SET_FRIENDS:
            return {
                ...state,
                list: action.list
            }
        default:
            return state;
    }
}

export const setFriends = (friends) => (dispatch) => {
    dispatch(setFriendsCreator(friends))
}


export default friendsReducer
