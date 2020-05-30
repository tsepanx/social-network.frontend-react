import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthApi} from "../../api/api";
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
                let status = r.response.status

                switch (status) {
                    case 401:
                        props.submitLogout()
                        break
                    case 404:
                        props.setProfile({
                            loaded: true
                        })
                }
            }
        }

        useEffect(() => {
            if (!props.auth.authorized) {
                props.authCurrentUser()
            } else {
                if (!props.profile.loaded) {
                    fetchProfile()
                }
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
        connect(mapStateToPropsForRedirect, {authCurrentUser, setProfile, submitLogout})
    )(RedirectComponent)
}