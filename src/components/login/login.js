import React from 'react';
import {connect} from "react-redux";
import {submitLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {compose} from "redux";

import './login.css'

import {resetProfile} from "../../redux/profile-reducer";
import {defaultForm} from "../common/form/form/form";

const Login = (props) => {

    const onSubmit = (formData) => {
        props.submitLogin(formData)
    }

    if (props.authorized) {
        props.resetProfile()
        return <Redirect to={`/profile/${props.credentials.id}`}/>
    }

    return <div className='login'>
        <h3 className='login-title'>Login page</h3>
        {defaultForm(onSubmit).login}
    </div>
}

const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
}

export default compose(
    connect(mapStateToProps, {submitLogin, resetProfile})
)(Login)