import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {authCurrentUser, submitLogout} from "../../redux/auth-reducer";
import Spinner from "../common/spinner/spinner";
import {setProfile} from "../../redux/profile-reducer";

let mapStateToPropsForRedirect = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {

        let [fetching, setFetching] = useState(true)
        setTimeout(() => {setFetching(false)}, 200)

        useEffect(() => {
            if (!props.auth.authorized) {
                props.authCurrentUser()
            }
        })

        if (!fetching) {
            if (!props.auth.authorized)
                return <Redirect to={'/login'}/>

            return <Component {...props}/>
        } else {
            return <Spinner/>
        }
    }

    return compose(
        connect(mapStateToPropsForRedirect, {authCurrentUser, setProfile, submitLogout})
    )(RedirectComponent)
}