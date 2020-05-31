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
                <h2 className='title'>{title}</h2>
                <>{fields}</>
                <button className={`btn ${buttonClass}`}>
                    {buttonText}
                </button>
            </form>
        </div>
    )

    const ReduxForm = reduxForm({form: name})(Form)
    return <ReduxForm onSubmit={onSubmit}/>
}