import React from "react";
import styles from "./FormsControls.module.css";

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
