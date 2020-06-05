import {compose} from "redux";
import {connect} from "react-redux";
import React from "react";
import ProfileContainer from "../profile/profile-page/profile";
import {withAuth} from "../hoc/with-auth";

const ProfileContent = (props) => {
    const getCurrentId = () => {
        let url = window.location.pathname

        try {
            let id = Number(url.split('/').slice(-1))
            if (!id) { throw 1}
            return id
        } catch (e) { return e }
    }

    return (
        <React.Fragment>
            <ProfileContainer {...props} id={getCurrentId()}/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    //
}

export default compose(
    connect(mapStateToProps, {}),
    withAuth
)(ProfileContent)