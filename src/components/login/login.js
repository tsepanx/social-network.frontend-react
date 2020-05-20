import React from 'react';
import {commonReduxForm, commonInputFormField} from '../common/form-control/form-control';
import {connect} from "react-redux";
import {submitLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.submitLogin(formData)
    }

    if (props.authorized) {
        return <Redirect to={'/profile'}/>
    }

    const loginFields = [
        commonInputFormField('username', 'Username'),
        commonInputFormField('password', 'Password')
    ]

    return <div>
        <h2>Login</h2>
        {commonReduxForm(
            'login',
            onSubmit,
            loginFields,
            'Login')}
    </div>
}

const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
}

export default connect(mapStateToProps, {submitLogin})(Login);