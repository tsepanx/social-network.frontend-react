import {reduxForm} from "redux-form";
import React from "react";

import './form.css'
import {defaultField} from "../form-field/form-field";

export const commonReduxForm = (name,
                                onSubmit,
                                fields,
                                title = null,
                                buttonText = 'Submit',
                                buttonClass = 'btn-info') => {
    const Form = ({handleSubmit}) => (
        <div className='form bg-dark'>
            <form onSubmit={handleSubmit}>

                <h3 className='form-title'>{title}</h3>

                <div>{fields}</div>

                <button className={`btn ${buttonClass}`}>{buttonText}</button>
            </form>
        </div>
    )

    const ReduxForm = reduxForm({form: name})(Form)
    return <ReduxForm onSubmit={onSubmit}/>
}

export const defaultForm = (onSubmit) => ({
    login: commonReduxForm('login', onSubmit,
        [defaultField.username, defaultField.password],
        'Login', 'Login'),

    signup: commonReduxForm('signup', onSubmit,
        [defaultField.username, defaultField.password],
        'Sign Up')
})