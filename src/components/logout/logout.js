import {compose} from "redux";
import React from "react";
import {connect} from "react-redux";
import {submitLogout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const Logout = (props) => {
    props.submitLogout()
    return <Redirect to={'/profile'}/>
}

const mapStateToProps = (state) => ({
    ...state.auth
})

export default compose(
    connect(mapStateToProps, {submitLogout})
)(Logout)