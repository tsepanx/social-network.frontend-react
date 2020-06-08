import React from 'react';
import s from './form-field.module.css';
import {Field} from 'redux-form';
import {defaultInputValidators, defaultPasswordValidators} from '../../../../utils/validators';

const FormFieldComponent = (Element) => ({input, meta: {touched, error}, child, ...props}) => {
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

export const textarea = FormFieldComponent('textarea')
export const input = FormFieldComponent('input')

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

export const defaultInputField = (name, placeholder = undefined, validators = undefined, type = undefined) =>
    commonFormField(name, input, placeholder, validators, type)

export const defaultTextareaField = (name, placeholder = undefined, validators = undefined, type = undefined) =>
    commonFormField(name, textarea, placeholder, validators, type)

export const defaultField = {
    username: defaultInputField(
        'username',
        'Username'
    ),

    password: defaultInputField(
        'password',
        'Password',
        defaultPasswordValidators,
        'password'
    )
}