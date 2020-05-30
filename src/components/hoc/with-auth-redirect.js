import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthApi} from "../../api/api";
import {compose} from "redux";
import {setLoggedIn, submitLogout} from "../../redux/auth-reducer";
import Spinner from "../common/spinner/spinner";
import {setProfile} from "../../redux/profile-reducer";

let mapStateToPropsForRedirect = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {

        let [fetching, setFetching] = useState(true)

        const fetchProfile = async () => {
            const id = props.auth.credentials.id
            let r = await AuthApi.getProfile(id)

            if (r.data) {
                props.setProfile({
                    username: r.data.user.username,
                    profilePhoto: r.data.profile_photo,
                    status: r.data.status
                })
            } else {
                props.submitLogout()
            }
        }

        let fetchUser = async () => {
            if (!props.auth.authorized) {
                setFetching(true)
                let response = await AuthApi.getMe()
                let success = response !== false

                if (success) {
                    props.setLoggedIn({...response.data})
                }
            }
        }

        useEffect(() => {
            fetchUser()
                .then(() => { setTimeout(() => {setFetching(false)}, 200) })

            if (!props.profile.loaded && props.auth.authorized) {
                fetchProfile()
            }
        })

        if (!fetching) {
            if (!props.auth.authorized) return <Redirect to={'/login'}/>

            return <Component {...props}/>
        } else {
            return <Spinner/>
        }
    }

    return compose(
        connect(mapStateToPropsForRedirect, {setLoggedIn, setProfile, submitLogout})
    )(RedirectComponent)
}