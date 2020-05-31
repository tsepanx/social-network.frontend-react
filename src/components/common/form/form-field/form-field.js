import React from 'react';
import s from './form-field.module.css';
import {Field} from 'redux-form';
import {defaultInputValidators} from '../../../../utils/validators';

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
    <Field
        component={component}
        placeholder={placeholder}
        name={name}
        type={type}
        validate={validators}
    />

