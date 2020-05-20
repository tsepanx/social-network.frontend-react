import React from 'react';
import {commonReduxForm, commonFormField, input} from '../common/form-control/form-control';
import {connect} from "react-redux";
import {submitLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {defaultPasswordValidators} from "../../utils/validators";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.submitLogin(formData)
    }

    if (props.authorized) {
        return <Redirect to={'/profile'}/>
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

export default connect(mapStateToProps, {submitLogin})(Login);