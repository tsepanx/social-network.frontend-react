import {compose} from "redux";
import {withAuth} from "../hoc/with-auth";
import React from "react";
import Profile from "./profile/profile";
import {Redirect} from "react-router-dom";

let ProfilePage = (props) => {
    let {auth, match} = props

    const userId = parseInt(match.params.userId)

    if (auth.authorized) {
        const authId = props.auth.credentials.id

        if (userId === authId)
            return <Redirect to={'/me'}/>
    }

    return (
        <Profile {...props} id={userId}/>
    )
}

let AuthorizedProfilePage = (props) => {
    let {auth} = props

    const userId = auth.credentials.id

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