import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/with-auth-redirect";

const Feed = (props) => {
    return (
        <div>
            My feed
        </div>
    )
}

let mapStateToProps = (state) => ({
    //
});

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect,
)(Feed)