import React, {useEffect, useState} from "react";
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

        let [fetching, setFetching] = useState(false)
        let [loaded, setLoaded] = useState(false)

        useEffect(() => {
            if (!fetching && !loaded) {
                setFetching(true)
                if (!props.auth.authorized) {
                    props.authCurrentUser(false)
                }
            }
            setTimeout(() => {setLoaded(true)}, 200)
        })

        if (loaded) {
            return <Component {...props}/> // TODO divide components with auth to redirect able and not
        } else {
            return <Spinner/>
        }
    }

    return compose(
        connect(mapStateToPropsForRedirect, {authCurrentUser, setProfile, submitLogout})
    )(RedirectComponent)
}