import React, {useEffect, useState} from "react";

import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/with-auth-redirect";
import {FriendsApi} from "../../api/api";
import ProfileCard from "../profile/profile-card/profile-card";
import Spinner from "../common/spinner/spinner";

const friendsToCards = (value, index) => {
    return <ProfileCard
        key={index}
        {...value}
    />
}

const Friends = ({auth}) => {

    let [friends, setFriends] = useState([])  // TODO put data in state firstly
    let [fetching, setFetching] = useState(true)

    const fetchFriends = async () => {
        try {
            let r = await FriendsApi.getRelationships(auth.credentials.id)


            if (r.data) {
                setFriends(r.data.users)
            }
            setFetching(false)
        } catch (e) {

        }

    }

    useEffect(() => {
        if (fetching) {
            fetchFriends()
        }
    })

    return (
        <div>
            <h3>Friends</h3>

            {friends.map(friendsToCards)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.auth
})

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Friends)