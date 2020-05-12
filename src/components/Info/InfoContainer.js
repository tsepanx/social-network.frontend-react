import React, {useState} from "react";
import * as axios from "axios";
import {connect} from "react-redux";

import {addInfoItemCreator, setInfoItemsCreator, updateNewItemTextCreator} from "../../redux/info-reducer";
import InfoItems from "./InfoItems";
import {receiveCountries} from "../../api/api";

const InfoContainer = (props) => {

    const [countries, setCountries] = useState(['rus', 'china', 'germany', 'spain', 'france'])

    const reloadBtn = React.createRef()
    const newItemText = React.createRef()


    const onReload = () => {
        let onReceivedCountry = data => {
            props.addItem(data)
            console.log(data)
        }

        props.setItems([])
        receiveCountries(countries, onReceivedCountry)
    }

    const onNewItemTextUpdated = () => {
        let newText = newItemText.current.value
        props.updateNewItemText(newText)
    }

    const onAddNewItem = () => {
        setCountries(prevState => [...prevState, props.newItemText])
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

let mapStateToProps = (state) => ({ ...state.info })


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