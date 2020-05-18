import React, {useState} from "react";

import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

import {reload, validateCountry} from "../../redux/info-reducer";
import InfoItems from "./info-items";

import {input, textarea} from "../common/form-control/form-control";
import defaultValidators from "../../utils/validators";

let AddNewItemForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={input}
                    placeholder={'Country name'}
                    name={'name'}
                    validate={defaultValidators}
                />
                <button>Add new item</button>
            </div>
        </form>
    )
}

AddNewItemForm = reduxForm({form: 'newItem'})(AddNewItemForm)

const InfoContainer = (props) => {

    const [countries, setCountries] = useState(['Russia', 'Spain'])

    const addNewCountry = (name) => setCountries(prevState => [...prevState, name])

    const onSubmitNewItem = (formData) => {
        props.validateCountry(formData.name, addNewCountry)
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

export default connect(mapStateToProps, {reload, validateCountry})(InfoContainer)