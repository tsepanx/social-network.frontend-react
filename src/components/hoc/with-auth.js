import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {loginCurrentUser, setLoggedIn, setLoggedOut} from "../../redux/auth-reducer";
import withData from "./with-data";

export const withAuth = (Component) => {

    const getData = async (props) => {
        return props.loginCurrentUser();
    }

    const onLoaded = async (props, data) => {
        return props.setLoggedIn(data);
    }

    const onError = (props, error) => {
        console.log('error', error)
        return props.setLoggedOut()
    }

    let mapStateToProps = (state) => ({
        auth: state.auth,
    });

    return compose(
        connect(mapStateToProps, {loginCurrentUser, setLoggedIn, setLoggedOut}),
        withData(getData, onLoaded, onError)
    )(Component)
}