import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuth} from "../hoc/with-auth";

const StartPage = (props) => {
    return (
        <div>
            <h3>Start Page!!!</h3>
        </div>
    )
}

let mapStateToProps = (state) => ({
    //
});

export default compose(
    connect(mapStateToProps, {}),
    // withAuth
)(StartPage)