import React from 'react';
import {reduxForm} from "redux-form";
import {commonInputFormField} from "../common/form-control/form-control";
import {connect} from "react-redux";
import {submitLogin} from "../../redux/auth-reducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {Redirect} from "react-router-dom";

const LoginForm = ({handleSubmit}) => {
    return (
        <div className="form bg-dark">
            <form onSubmit={handleSubmit}>
                {commonInputFormField('username', 'Username')}
                {commonInputFormField('password', 'Password')}
                <button className='btn btn-info'>Login</button>
            </form>
        </div>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.submitLogin(formData)
    }

    if (props.authorized) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
}

export default connect(mapStateToProps, {submitLogin})(Login);