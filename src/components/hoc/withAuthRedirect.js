import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    authorized: state.auth.authorized
});

export const withAuthRedirect = (Component) => {

    function RedirectComponent(props) {
        if (!props.authorized) return <Redirect to={{
            pathname: '/login',
            state: {id: 1}
        }}/>

        return <Component {...props}/>
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}