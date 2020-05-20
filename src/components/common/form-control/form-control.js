import React from 'react';
import s from './form-control.module.css';
import {Field, reduxForm} from 'redux-form';
import {defaultInputValidators} from '../../../utils/validators';

const FormComponent = (Element) => ({input, meta: {touched, error}, child, ...props}) => {
    const hasError = touched && error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>{
                React.createElement(Element,
                    {
                        ...input,
                        ...props,
                        className: 'form-control'
                    })
            }</div>

            <div className={s.errorMsg}>
                {hasError ? error : ''}
            </div>
        </div>
    )
}

export const textarea = FormComponent('textarea')
export const input = FormComponent('input')

export const commonFormField = (name,
                         component = input,
                         placeholder = '',
                         validators = defaultInputValidators,
                         type = 'text') =>
    (<Field
        component={component}
        placeholder={placeholder}
        name={name}
        type={type}
        validate={validators}
    />)

export const commonReduxForm = (name,
                                onSubmit,
                                fields,
                                buttonText = 'Submit',
                                buttonClass = 'btn-info') => {
    const Form = ({handleSubmit}) => (
        <div className='form bg-dark'>
            <form onSubmit={handleSubmit}>
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
