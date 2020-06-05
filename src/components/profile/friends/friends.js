import React from "react";

import {connect} from "react-redux";
import {compose} from "redux";
import {withAuth} from "../../hoc/with-auth";
import {FriendsApi} from "../../../api/api";
import ProfileCard from "../profile-card/profile-card";
import withData from "../../hoc/with-data";
import {setFriends} from "../../../redux/user-reducer";

const getData = async (props) => {
    // let id = props.auth.credentials.id
    let id = props.id
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

const FriendsContainer = (props) => {
    let friends = props.user.friends

    return (
        <div>
            <Friends list={friends}/>
        </div>
    )
}

export const Friends = ({list}) => {
    const friendsToCards = (value, index) => {
        return <ProfileCard
            key={index}
            {...value}
        />
    }

    return (
        <div>
            <h3>Friends</h3>

            {list.map(friendsToCards)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default compose(
    connect(mapStateToProps, {setFriends}),
    withData(getData, onLoaded, onError)
)(FriendsContainer)