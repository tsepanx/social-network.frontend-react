import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthApi} from "../../api/api";
import {compose} from "redux";
import {setLoggedIn} from "../../redux/auth-reducer";
import Spinner from "../common/spinner/spinner";
import {obtainProfile} from "../../redux/profile-reducer";

let mapStateToPropsForRedirect = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {

        let [fetching, setFetching] = useState(true)

        let apiFetch = async () => {
            if (!props.auth.authorized) {
                console.log(props)
                setFetching(true)
                let response = await AuthApi.getMe()
                let success = response !== false

                if (success) {
                    props.setLoggedIn({...response.data})
                }
            }
        }

        const profileFetch = async () => {
            if (props.auth.authorized) {
                props.obtainProfile(props.auth.credentials.id)
            }
        }

        useEffect(() => {
            apiFetch()
                .then(r => {
                    setFetching(false)
                })
            if (props.profile.status === '') {  // TODO Some less stupid selector
                console.log('status', props)
                profileFetch()
                    .then(r => {})
            }
        })

        useEffect(() => {
            console.log('name', props)
            profileFetch()
                .then(r => {})
        }, [props.auth.username])

        if (!fetching) {
            if (!props.auth.authorized) return <Redirect to={'/login'}/>

            return <Component {...props}/>
        } else {
            return <Spinner/>
        }
    }

    return compose(
        connect(mapStateToPropsForRedirect, {setLoggedIn, obtainProfile})
    )(RedirectComponent)
}