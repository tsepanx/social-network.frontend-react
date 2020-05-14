import React from "react";
import styles from "./FormsControls.module.css";
import {Field} from "redux-form";
import defaultValidators from "../../../utils/validators";

const FormControl = (Element) => ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>{React.createElement(Element, {...input, ...props})}</div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const textarea = FormControl('textarea')
export const input = FormControl('input')

export const defaultFormField = (component, name='default-name', placeholder=undefined) => (
    <Field
        component={component}
        placeholder={placeholder}
        name={name}
        validate={defaultValidators}
    />
)