import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {loginCurrentUser, setLoggedIn, setLoggedOut, submitLogout} from "../../redux/auth-reducer";
import withData from "./with-data";
import {Redirect} from "react-router-dom";

export const withAuth = (redirectLogin = false, preloader = undefined) => Component => {

    const shouldObtainData = (props) => !props.auth.loaded

    const getData = async (props) => props.loginCurrentUser()

    const onLoaded = async (props, data) => props.setLoggedIn(data)

    const onError = async (props, status) => props.submitLogout()

    const View = (props) => {
        let {auth} = props

        if (!auth.authorized && redirectLogin)
            return <Redirect to={'/login'}/>

        return <Component {...props}/>
    }

    let mapStateToProps = (state) => ({
        auth: state.auth,
    });

    return compose(
        connect(mapStateToProps, {loginCurrentUser, setLoggedIn, submitLogout}),
        withData(getData, onLoaded, onError, shouldObtainData, null, preloader)
    )(View)
}