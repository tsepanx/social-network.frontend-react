import React from "react";
import * as axios from "axios";
import {connect} from "react-redux";

import {addInfoItemCreator, setInfoItemsCreator} from "../redux/info-reducer";
import InfoItems from "./InfoItems";

const InfoContainer = (props) => {

    let countries = ['rus', 'us']

    const reloadBtn = React.createRef()

    const loadCountryPromise = (name) => {
        let url = `https://corona.lmao.ninja/v2/countries/${name}`
        return axios.get(url)
    }

    const loadCountries = (names, callback) => {
        for (const name of names) {
            loadCountryPromise(name).then(callback)
        }
    }

    const onReload = () => {
        let onLoadedCountry = response => {
            props.addItem(response.data)
            console.log(response)
        }

        props.setItems([])
        loadCountries(countries, onLoadedCountry)
    }

    return (
        <div>
            Some Info
            <textarea></textarea>
            <div className='btn btn-success' onClick={onReload} ref={reloadBtn}>Reload</div>
            <div><InfoItems list={props.items}/></div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        items: state.info.items,
    }
}


let mapDispatchToProps = (dispatch) => {
    return {
        setItems: (items) => {
            dispatch(setInfoItemsCreator(items))
        },
        addItem: (item) => {
            dispatch(addInfoItemCreator(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer)