import React, {useState} from "react";

import {reduxForm} from "redux-form";
import {connect} from "react-redux";

import {reload, validateCountry} from "../../redux/info-reducer";
import InfoItems from "./info-items";

import {commonInputFormField}  from "../common/form-control/form-control";

let AddNewItemForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            { commonInputFormField('name', 'Country name') }
            <button className='btn btn-info'>Add new item</button>
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
        (<div>{index}: {value}</div>)
    )

    return (
        <div>
            <div>{countriesList()}</div>

            <AddNewItemForm onSubmit={onSubmitNewItem}/>

            <button onClick={onReload}>Reload</button>
            <div><InfoItems list={props.items}/></div>
        </div>
    )
}

let mapStateToProps = (state) => ({...state.info})

export default connect(mapStateToProps, {reload, validateCountry})(InfoContainer)