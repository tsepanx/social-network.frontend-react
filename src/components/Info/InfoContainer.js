import React, {useState} from "react";
import {connect} from "react-redux";

import {
    reload,
    updateNewItemText
} from "../../redux/info-reducer";
import InfoItems from "./InfoItems";

const InfoContainer = (props) => {

    const [countries, setCountries] = useState(['rus', 'china', 'germany', 'spain', 'france'])

    const reloadBtn = React.createRef()
    const newItemText = React.createRef()

    const onNewItemTextUpdated = () => {
        let newText = newItemText.current.value
        props.updateNewItemText(newText)
    }

    const onAddNewItem = () => {
        if (newItemText.current.value.trim()) {
            setCountries(prevState => [...prevState, props.newItemText])
        }
    }

    return (
        <div>
            Some Info
            <div>{ countries.map((value, index) => <div>{index}: {value ? value : 'empty string'}</div>)}</div>
            <textarea ref={newItemText} onChange={onNewItemTextUpdated} value={props.newItemText}/>
            <div onClick={onAddNewItem} className='btn btn-dark'>Add new item</div>
            <div className='btn btn-success' onClick={() => {props.reload(countries)}} ref={reloadBtn}>Reload</div>
            <div><InfoItems list={props.items} /></div>
        </div>
    )
}

let mapStateToProps = (state) => ({ ...state.info })

export default connect(mapStateToProps, {reload, updateNewItemText})(InfoContainer)