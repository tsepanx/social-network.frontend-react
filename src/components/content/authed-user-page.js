import {compose} from "redux";
import {connect} from "react-redux";
import React from "react";
// import Profile from "../profile/profile-page/profile";
import {withAuth} from "../hoc/with-auth";

const AuthedUserPage = (props) => {
    let {profilePhoto} = props.profile

    // if (!profilePhoto)
    //     profilePhoto =  // TODO

    const userId = props.auth.credentials.id

    return (
        <>
            Auth user profile
            {/*<Profile {...props} id={userId}/>*/}
        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    profile: state.profile,
})

export default compose(
    connect(mapStateToProps, {}),
    withAuth
)(AuthedUserPage)