import React from "react";

import {connect} from "react-redux";
import {compose} from "redux";
import {withAuth} from "../hoc/with-auth";

const Messages = (props) => {
    return (
        <h3>Messages</h3>
    )
}

const mapStateToProps = (state) => ({
    ...state.auth
})

export default compose(
    connect(mapStateToProps, {}),
    withAuth,
)(Messages)