import {compose} from "redux";
import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const SignUp = (props) => {
    return (
        <div>
            <h3>Sign Up HERE</h3>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.auth
})

export default compose(
    connect(mapStateToProps, {})
)(SignUp)