import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuth} from "../hoc/with-auth";

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
    withAuth(true),
)(Feed)