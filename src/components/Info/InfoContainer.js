import React, {useState} from "react";
import {connect} from "react-redux";

import {
    reload,
    setNewItemText
} from "../../redux/info-reducer";
import InfoItems from "./InfoItems";

const InfoContainer = (props) => {

    const [countries, setCountries] = useState(['rus', 'china', 'germany', 'spain', 'france'])

    const newItemText = React.createRef()

    const onNewItemTextChanged = () => {
        let newText = newItemText.current.value
        props.setNewItemText(newText)
    }

    const onAddNewItem = () => {
        if (newItemText.current.value.trim()) {
            setCountries(prevState => [...prevState, props.newItemText])
            props.setNewItemText('')
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
            <textarea ref={newItemText} onChange={onNewItemTextChanged} value={props.newItemText}/>
            <div>

                <button onClick={onAddNewItem}>Add new item</button>
                <button onClick={onReload}>Reload </button>
            </div>
            <div><InfoItems list={props.items} /></div>
        </div>
    )
}

let mapStateToProps = (state) => ({ ...state.info })

export default connect(mapStateToProps, {reload, setNewItemText})(InfoContainer)