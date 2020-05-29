import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthApi} from "../../api/api";
import {compose} from "redux";
import {setLoggedIn} from "../../redux/auth-reducer";
import Spinner from "../common/spinner/spinner";

let mapStateToPropsForRedirect = (state) => ({
    authorized: state.auth.authorized
});

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {

        let [fetching, setFetching] = useState(true)

        useEffect(() => {
            AuthApi.getMe()
                .then(r => {
                    if (r) {
                        props.setLoggedIn(r.data.username)
                    } else {
                        console.log('Error while logging in...')
                    }

                    setTimeout(() => {
                        setFetching(false)
                    }, 500)
                })
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
        connect(mapStateToPropsForRedirect, {setLoggedIn})
    )(RedirectComponent)
}