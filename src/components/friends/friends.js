import React from "react";

import {connect} from "react-redux";
import {compose} from "redux";
import {withAuth} from "../hoc/with-auth";
import {FriendsApi} from "../../api/api";
import ProfileCard from "../profile/profile-card/profile-card";
import withData from "../hoc/with-data";
import {setFriends} from "../../redux/friends-reducer";

const getData = async (props) => {
    let id = props.auth.credentials.id
    let r = await FriendsApi.getRelationships(id)
    return r.data
}

const onLoaded = async (props, data) => {
    props.setFriends(data.users)
}

const onError = async (props, err) => {
    debugger
    console.log(err)
}

const Friends = ({auth, friends}) => {
    const friendsToCards = (value, index) => {
        return <ProfileCard
            key={index}
            {...value}
        />
    }

    const friendsList = friends.list

    return (
        <div>
            <h3>Friends</h3>

            {friendsList.map(friendsToCards)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    friends: state.friends
})

export default compose(
    connect(mapStateToProps, {setFriends}),
    withAuth,
    withData(getData, onLoaded, onError)
)(Friends)