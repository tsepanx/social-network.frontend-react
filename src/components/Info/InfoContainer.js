import React, {useState} from "react";

import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

import {reload} from "../../redux/info-reducer";
import InfoItems from "./InfoItems";
import {fieldLengthLessThan, fieldNotNull} from "../../utils/validators";
import {input} from "../common/FormsControls/FormsControls";

const fieldLengthLessThan15 = fieldLengthLessThan(15)

let AddNewItemForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={input}
                    placeholder={'Country name'}
                    name='input'
                    validate={[
                        fieldNotNull,
                        fieldLengthLessThan15
                    ]}
                />

                <button>Add new item</button>
            </div>
        </form>
    )
}

AddNewItemForm = reduxForm({form: 'new-item'})(AddNewItemForm)

const InfoContainer = (props) => {

    const [countries, setCountries] = useState(['rus', 'china', 'germany', 'spain', 'france'])

    const onSubmitNewItem = (formData) => {
        let newName = formData.input

        if (newName) {
            if (newName.trim()) {
                setCountries(prevState => [...prevState, newName])
            }
        }
    }

    const onReload = () => {
        props.reload(countries)
    }

    const countriesList = () => countries.map((value, index) =>
        ( <div>{index}: {value}</div> )
    )

    return (
        <div>
            Some Info
            <div>{ countriesList() }</div>
            <AddNewItemForm onSubmit={onSubmitNewItem}/>
            <button onClick={onReload}>Reload </button>
            <div><InfoItems list={props.items} /></div>
        </div>
    )
}

let mapStateToProps = (state) => ({ ...state.info })

export default connect(mapStateToProps, {reload})(InfoContainer)