import {compose} from "redux";
import {withAuth} from "../hoc/with-auth";
import React from "react";
import Profile from "./profile/profile";
import {Redirect} from "react-router-dom";

let ProfilePage = (props) => {
    const userId = parseInt(props.match.params.userId)

    if (props.auth.authorized) {
        const authId = props.auth.credentials.id

        if (userId === authId) // profile of authorized user
            return <Redirect to={'/me'}/>
    }

    return (
        <Profile {...props} id={userId}/>
    )
}

let AuthorizedProfilePage = (props) => {
    const userId = props.auth.credentials.id

    return (
        <Profile {...props} id={userId}/>
    )
}

ProfilePage = compose(
    withAuth(false)
)(ProfilePage)


AuthorizedProfilePage = compose(
    withAuth(true)
)(AuthorizedProfilePage)

export {AuthorizedProfilePage, ProfilePage}