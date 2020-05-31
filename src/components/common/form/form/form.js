import {reduxForm} from "redux-form";
import React from "react";

import './form.css'

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