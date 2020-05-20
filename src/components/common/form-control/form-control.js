import React from 'react';
import s from './form-control.module.css';
import {Field, reduxForm} from 'redux-form';
import defaultValidators from '../../../utils/validators';
import Spinner from "../spinner/spinner";

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

const textarea = FormComponent('textarea')
const input = FormComponent('input')

const commonFormField = (name,
                         component = input,
                         placeholder = '',
                         validators = defaultValidators) =>
    (<Field
        component={component}
        placeholder={placeholder}
        name={name}
        validate={validators}
    />)

export const commonInputFormField = (name,
                                     placeholder = '',
                                     validators = defaultValidators) =>
    commonFormField(name, input, placeholder, validators)

export const commonTextareaFormField = (name,
                                        placeholder = '',
                                        validators = defaultValidators) =>
    commonFormField(name, textarea, placeholder, validators)

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
