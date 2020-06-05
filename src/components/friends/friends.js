import React from "react";

import {connect} from "react-redux";
import {compose} from "redux";
import {withAuth} from "../hoc/with-auth";
import {FriendsApi} from "../../api/api";
import ProfileCard from "../profile/profile-card/profile-card";
import withData from "../hoc/with-data";
import {setFriends} from "../../redux/user-reducer";

const getData = async (props) => {
    let id = props.auth.credentials.id
    let r = await FriendsApi.getRelationships(id)
    return r.data
}

const onLoaded = async (props, data) => {
    props.setFriends(data["users"]);
}

const onError = async (props, err) => {
    debugger
    console.log(err)
}

const Friends = ({user}) => {
    const friendsToCards = (value, index) => {
        return <ProfileCard
            key={index}
            {...value}
        />
    }

    const friendsList = user.friends

    return (
        <div>
            <h3>Friends</h3>

            {friendsList.map(friendsToCards)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default compose(
    connect(mapStateToProps, {setFriends}),
    withAuth,
    withData(getData, onLoaded, onError)
)(Friends)