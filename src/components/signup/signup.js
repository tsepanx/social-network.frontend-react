import {compose} from "redux";
import React from "react";
import {connect} from "react-redux";

import {defaultForm} from "../common/form/form/form";
import {submitSignUp} from "../../redux/auth-reducer";

const SignUp = (props) => {

    const handleSubmit = (formData) => {
        props.submitSignUp(formData)
    }

    return (
        <div className='signup'>
            <h3>Sign Up HERE</h3>

            {defaultForm(handleSubmit).signup}
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.auth
})

export default compose(
    connect(mapStateToProps, {submitSignUp})
)(SignUp)