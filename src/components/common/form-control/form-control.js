import React from "react";
import styles from "./form-control.module.css";

const FormControl = (Element) => ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>{React.createElement(Element, {...input, ...props})}</div>
            {hasError && <span>{meta.error}</span>}

            { props.error &&
            <div className={styles.formSummaryError}>
                {props.error}
            </div>}

        </div>
    )
}

export const textarea = FormControl('textarea')
export const input = FormControl('input')
