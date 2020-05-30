import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/with-auth-redirect";

const StartPage = (props) => {
    return <React.Fragment>
        Start Page!!!
    </React.Fragment>
}

let mapStateToProps = (state) => ({
    //
});

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(StartPage)