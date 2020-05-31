import React, {useState} from "react";
import {connect} from "react-redux";

import Spinner from "../common/spinner/spinner";
import {commonFormField, input} from "../common/form/form-field/form-field";

import {reload, validateCountry} from "../../redux/info-reducer";
import InfoItems from "./info-items";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/with-auth-redirect";
import {commonReduxForm} from "../common/form/form/form";

const InfoContainer = (props) => {

    const [countries, setCountries] = useState(['Russia', 'Spain'])

    const addNewCountry = (name) => setCountries(prevState => [...prevState, name])

    const onSubmitNewItem = (formData) => {
        props.validateCountry(formData.name, addNewCountry)
    }

    const onReload = () => {
        if (!props.fetching) {
            props.reload(countries)
        }
    }

    const countriesList = () => countries.map((value, index) =>
        (<div>{index}: {value}</div>)
    )

    const fields = [
        commonFormField('name',
            input,
            'Country name',
            null,
            'text'
        )
    ]

    return (
        <div>
            {commonReduxForm('new', onSubmitNewItem, fields, 'Add new item')}
            <div>{countriesList()}</div>

            <button className='btn btn-secondary' onClick={onReload}>Reload</button>
            { props.fetching ? <Spinner /> : null }
            <div><InfoItems list={props.items}/></div>
        </div>
    )
}

let mapStateToProps = (state) => ({...state.info})

export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, {reload, validateCountry})
)(InfoContainer)