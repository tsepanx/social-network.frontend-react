import React, {useState} from "react";

import {reduxForm} from "redux-form";
import {connect} from "react-redux";

import {reload} from "../../redux/info-reducer";
import InfoItems from "./InfoItems";

import {defaultFormField, input} from "../common/FormsControls/FormsControls";

const defaultField = defaultFormField(input, 'name', 'Country name')

let AddNewItemForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {defaultField}
                <button>Add new item</button>
            </div>
        </form>
    )
}

AddNewItemForm = reduxForm({form: 'new-item-form'})(AddNewItemForm)

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