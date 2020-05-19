import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

const mapStateToProps = (state) => {
    return {
        //TODO
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // TODO
    }
}

const Profile = (props) => {
    return (
        <div>
            My Profile
        </div>
    )
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Profile)