import {compose} from "redux";
import React from "react";
import {connect} from "react-redux";
import {submitLogout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const Logout = (props) => {
    if (props.authorized) {
        // debugger
        props.submitLogout()
        return <Redirect to={'/profile'}/>
    }

    return <>AAA</>

}

const mapStateToProps = (state) => ({
    ...state.auth
})

export default compose(
    connect(mapStateToProps, {submitLogout})
)(Logout)