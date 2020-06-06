import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {loginCurrentUser, setLoggedIn, setLoggedOut} from "../../redux/auth-reducer";
import withData from "./with-data";
import {Redirect} from "react-router-dom";

export const withAuth = (redirectLogin = false) => Component => {

    const getData = async (props) => {
        return props.loginCurrentUser();
    }

    const onLoaded = async (props, data) => {
        return props.setLoggedIn(data);
    }

    const onError = async (props, error) => {
        console.log('error', error)
        await props.setLoggedOut()
        return false
    }

    let mapStateToProps = (state) => ({
        auth: state.auth,
    });

    const View = (props) => {
        if (!props.auth.authorized && redirectLogin)
            return <Redirect to={'/login'}/>

        return <Component {...props}/>
    }

    return compose(
        connect(mapStateToProps, {loginCurrentUser, setLoggedIn, setLoggedOut}),
        withData(getData, onLoaded, onError)
    )(View)
}