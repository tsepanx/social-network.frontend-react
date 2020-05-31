import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/with-auth-redirect";

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
    // withAuthRedirect
)(StartPage)