import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthApi} from "../../api/api";
import {compose} from "redux";
import {setLoggedIn} from "../../redux/auth-reducer";
import Spinner from "../common/spinner/spinner";
import {setProfile} from "../../redux/profile-reducer";

let mapStateToPropsForRedirect = (state) => ({
    authorized: state.auth.authorized,
    profile: state.profile,
});

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {

        let [fetching, setFetching] = useState(true)

        let apiFetch = async () => {
            if (!props.authorized) {
                setFetching(true)
                let response = await AuthApi.getMe()
                let isAuthorized = response !== false

                if (isAuthorized) {
                    props.setLoggedIn(response.data)

                    let r = await AuthApi.getProfile(response.data.id)
                    props.setProfile({
                        profilePhoto: r.data.profile_photo,
                        status: r.data.status
                    })
                }
            }
        }

        useEffect(() => {
            apiFetch()
                .then(r => { setTimeout(() => { setFetching(false) }, 300) })
        })

        if (!fetching) {
            if (!props.authorized) return <Redirect to={{
                pathname: '/login',
            }}/>

            return <Component {...props}/>
        } else {
            return <Spinner/>
        }
    }

    return compose(
        connect(mapStateToPropsForRedirect, {setLoggedIn, setProfile})
    )(RedirectComponent)
}