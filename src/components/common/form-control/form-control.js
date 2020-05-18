import React from "react";
import s from "./form-control.module.css";
import {Field} from "redux-form";
import defaultValidators from "../../../utils/validators";

const FormControl = (Element) => ({input, meta: {touched, error}, child, ...props}) => {
    const hasError = touched && error;

    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>{
                React.createElement(Element,
                    {
                        ...input,
                        ...props,
                        className: 'form-control'
                    })
            }</div>

            {hasError && <span>{error}</span>}

            {props.error &&
            <div className={s.formSummaryError}>
                {props.error}
            </div>}
        </div>
    )
}

const textarea = FormControl('textarea')
const input = FormControl('input')

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