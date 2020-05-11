import React, {useState} from "react";
import * as axios from "axios";
import {connect} from "react-redux";

import {addInfoItemCreator, setInfoItemsCreator, updateNewItemTextCreator} from "../redux/info-reducer";
import InfoItems from "./InfoItems";

const InfoContainer = (props) => {

    const [countries, setCountries] = useState(['rus', 'us', 'uk', 'sweden', 'china', 'japan', 'germany', 'spain', 'france'])

    const reloadBtn = React.createRef()
    const newItemText = React.createRef()

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

    const onNewItemTextUpdated = () => {
        let newText = newItemText.current.value
        props.updateNewItemText(newText)
    }

    const onAddNewItem = () => {
        // debugger
        setCountries(prevState => [...prevState, props.newItemText])
        // debugger
    }

    return (
        <div>
            Some Info
            <div>{ countries.map(value => `${value} `)}</div>
            <textarea ref={newItemText} onChange={onNewItemTextUpdated} value={props.newItemText}/>
            <div onClick={onAddNewItem} className='btn btn-dark'>Add new item</div>
            <div className='btn btn-success' onClick={onReload} ref={reloadBtn}>Reload</div>
            <div><InfoItems list={props.items}/></div>
        </div>
    )
}

let mapStateToProps = (state) => {
    // console.log({ ...state.info })
    return { ...state.info }
}


let mapDispatchToProps = (dispatch) => {
    return {
        setItems: (items) => {
            dispatch(setInfoItemsCreator(items))
        },
        addItem: (item) => {
            dispatch(addInfoItemCreator(item))
        },
        updateNewItemText: (text) => {
            dispatch(updateNewItemTextCreator(text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer)