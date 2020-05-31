import React from 'react';
import {commonFormField, input} from '../common/form/form-field/form-field';
import {connect} from "react-redux";
import {submitLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {defaultPasswordValidators} from "../../utils/validators";
import {compose} from "redux";
import {resetProfile} from "../../redux/profile-reducer";
import {commonReduxForm} from "../common/form/form/form";

const Login = (props) => {

    const onSubmit = (formData) => {
        props.submitLogin(formData)
    }

    if (props.authorized) {
        props.resetProfile()
        return <Redirect to={`/profile/${props.credentials.id}`}/>
    }

    const usernameField = commonFormField(
        'username',
        input,
        'Username'
    )

    const passwordField = commonFormField(
        'password',
        input,
        'Password',
        defaultPasswordValidators,
        'password'
    )

    return <div>
        <h2>Login</h2>
        {commonReduxForm(
            'login',
            onSubmit,
            [usernameField, passwordField],
            'Login')}
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