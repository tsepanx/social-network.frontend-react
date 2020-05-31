import {compose} from "redux";
import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {defaultForm} from "../common/form/form/form";
import {AuthApi} from "../../api/api";
import {submitSignUp} from "../../redux/auth-reducer";

const SignUp = (props) => {

    const onSubmit = (formData) => {
        // AuthApi.authUser(formData)
            // .
        props.submitSignUp(formData)
    }

    return (
        <div className='signup'>
            <h3>Sign Up HERE</h3>

            {defaultForm(onSubmit).signup}
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.auth
})

export default compose(
    connect(mapStateToProps, {submitSignUp})
)(SignUp)