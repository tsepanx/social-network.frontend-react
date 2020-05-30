import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/with-auth-redirect";

const Settings = (props) => {
    return (
        <div>
            Settings
        </div>
    )
}

let mapStateToProps = (state) => ({
    //
});

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect,
)(Settings)